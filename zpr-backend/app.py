import threading
import time

from flask import Flask, request
from flask_socketio import SocketIO, emit
from src.utils import random_ball_speed, GameState, PADDLE_SPEED, STARTING_PADDLE_Y
from engineio.payload import Payload
import eventlet

Payload.max_decode_packets = 500

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(
    cors_allowed_origins=['http://localhost:3000', 'http://127.0.0.1:3000'],
    engineio_logger=True,
    logger=True
)
eventlet.monkey_patch()
state = GameState()


@socketio.on('connect')
def handle_connect():
    for player in state.players:
        if state.players[player] is None:
            state.players[player] = {
                'sid': request.sid,
                'paddle_y': STARTING_PADDLE_Y
            }
            emit('player_assignment', {'player': player})
            break


@socketio.on('disconnect')
def handle_disconnect():
    for player in state.players:
        if state.players[player] is not None \
                and state.players[player]['sid'] == request.sid:
            state.players[player] = None
            break
    state.stop_game()


@socketio.on('start')
def start_game():
    if state.is_game_started:
        return
    emit('game_started', broadcast=True)
    state.start_game()
    game_loop()


@socketio.on('stop')
def stop_game():
    emit('game_stopped', broadcast=True)
    state.stop_game()


@socketio.on('reset_ball')
def reset_ball():
    stop_game()
    x_speed, y_speed = random_ball_speed()
    emit('reset_ball_response', {
        'x_speed': x_speed,
        'y_speed': y_speed
    }, broadcast=True)


@socketio.on('move_paddle')
def move_paddle(data):
    if not state.is_game_started:
        return
    for player in state.players:
        if player is None:
            return
        if state.players[player]['sid'] == request.sid:
            if data['direction'] == 'down':
                state.players[player]['paddle_y'] += PADDLE_SPEED
            elif data['direction'] == 'up':
                state.players[player]['paddle_y'] -= PADDLE_SPEED
            break
    emit('paddle_response', {
        'player1': state.players['player1']['paddle_y'],
        'player2': state.players['player2']['paddle_y'],
    }, broadcast=True)


def game_loop():
    while state.is_game_started:
        emit('tick', broadcast=True)
        if state.test_mode:
            break
        time.sleep(0.1)


if __name__ == '__main__':
    socketio.init_app(app)
    socketio.run(app)
