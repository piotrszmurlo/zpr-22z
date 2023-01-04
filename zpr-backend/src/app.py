import time
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
server = SocketIO(app, cors_allowed_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], engineio_logger=True)

game_started = False


@server.on('connect')
def test_connect():
    print('CONNECT EVENT happened...')
    # emit('success', {'data': 'Connected'})


@server.on('disconnect')
def handle_disconnect():
    print('DISCONNECT EVENT happened...')


@server.on('ping')
def handle_message():
    print('ping EVENT happened...')
    emit('pong', {'data': 'pong'})


@server.on('start')
def start_game():
    global game_started
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
        print('TICK')
        emit('tick')
        time.sleep(0.2)


if __name__ == '__main__':
    server.run(app)
