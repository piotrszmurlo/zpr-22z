import time
from flask import Flask, request
from flask_socketio import SocketIO, emit
from src.utils import random_ball_speed, GameState, PADDLE_SPEED
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
server = SocketIO(app, cors_allowed_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], engineio_logger=False)

state = GameState()


@server.on('connect')
def handle_connect():
    for player in state.players:
        if state.players[player] is None:
            state.players[player] = {
                'sid': request.sid,
                'paddle_y': 10
            }
            print(f'{player} connected')
            emit('player_assignment', {'player': player})
            break


@server.on('disconnect')
def handle_disconnect():
    for player in state.players:
        if state.players[player]['sid'] == request.sid:
            state.players[player] = None
            print(f'{player} disconnected')
            break
    state.stop_game()


@server.on('start')
def start_game():
    if state.is_game_started:
        return
    emit('game_started', broadcast=True)
    state.start_game()
    print("Game started")
    game_loop()


@server.on('stop')
def stop_game():
    emit('game_stopped', broadcast=True)
    state.stop_game()
    print("Game stopped")


@server.on('reset_ball')
def reset_ball():
    stop_game()
    x_speed, y_speed = random_ball_speed()
    emit('reset_ball_response', {
        'x_speed': x_speed,
        'y_speed': y_speed
    }, broadcast=True)


@server.on('arrow_down')
def arrow_down():
    if not state.is_game_started:
        return
    for player in state.players:
        if player is None:
            return
        if state.players[player]['sid'] == request.sid:
            state.players[player]['paddle_y'] += PADDLE_SPEED
            break
    emit('paddle_response', {
            'player1': state.players['player1']['paddle_y'],
            'player2': state.players['player2']['paddle_y'],
        },  broadcast=True)


@server.on('arrow_up')
def arrow_down():
    if not state.is_game_started:
        return
    for player in state.players:
        if player is None:
            return
        if state.players[player]['sid'] == request.sid:
            state.players[player]['paddle_y'] -= PADDLE_SPEED
            print(f"down from {player}")
            break
    emit('paddle_response', {
            'player1': state.players['player1']['paddle_y'],
            'player2': state.players['player2']['paddle_y'],
        },  broadcast=True)


def game_loop():
    while state.is_game_started:
        emit('tick', broadcast=True)
        time.sleep(0.05)


if __name__ == '__main__':
    server.run(app)
