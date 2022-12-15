import time
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
server = SocketIO(app, cors_allowed_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], engineio_logger=True)

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
    # time.sleep(1)
    # handle_message()


if __name__ == '__main__':
    server.run(app)
