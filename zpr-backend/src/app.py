import time
from flask import Flask
from flask_socketio import SocketIO, emit
from src.utils import random_ball_speed
app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
server = SocketIO(app, cors_allowed_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], engineio_logger=True)

game_started = False


@server.on('connect')
def test_connect():
    print('CONNECT EVENT happened...')


@server.on('disconnect')
def handle_disconnect():
    global game_started
    print('DISCONNECT EVENT happened...')
    game_started = False


@server.on('reset_ball')
def reset_ball():
    x_speed, y_speed = random_ball_speed()
    emit('reset_ball_response', {
        'x_speed': x_speed,
        'y_speed': y_speed
    })


@server.on('start')
def start_game():
    global game_started
    if game_started:
        return
    game_started = True
    print("Game started")
    game_loop()


@server.on('stop')
def stop_game():
    global game_started
    game_started = False
    print("Game stopped")


def game_loop():
    while game_started:
        emit('tick')
        time.sleep(0.05)


if __name__ == '__main__':
    server.run(app)
