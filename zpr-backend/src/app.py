import time
from flask import Flask, request
from flask_socketio import SocketIO, emit
from src.utils import random_ball_speed, GameState
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
server = SocketIO(app, cors_allowed_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], engineio_logger=False)

state = GameState()


@server.on('connect')
def handle_connect():
    for player in state.players:
        if state.players[player] is None:
            state.players[player] = request.sid
            print(f'Player {player} connected')
            break


@server.on('disconnect')
def handle_disconnect():
    for player in state.players:
        if state.players[player] == request.sid:
            state.players[player] = None
            print(f'Player {player} disconnected')
            break
    state.stop_game()


@server.on('reset_ball')
def reset_ball():
    x_speed, y_speed = random_ball_speed()
    emit('reset_ball_response', {
        'x_speed': x_speed,
        'y_speed': y_speed
    })


@server.on('start')
def start_game():
    if state.is_game_started:
        return
    state.start_game()
    print("Game started")
    game_loop()


@server.on('stop')
def stop_game():
    state.stop_game()
    print("Game stopped")


def game_loop():
    while state.is_game_started:
        emit('tick')
        time.sleep(0.05)


if __name__ == '__main__':
    server.run(app)
