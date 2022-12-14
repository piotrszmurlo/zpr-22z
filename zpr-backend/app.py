from flask import Flask
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins=['http://localhost:3000', 'http://127.0.0.1:3000'], engineio_logger=True)


@socketio.on('connect')
def test_connect():
    print('CONNECT EVENT happened...')
    # emit('success', {'data': 'Connected'})


@socketio.on('disconnect')
def handle_disconnect():
    print('DISCONNECT EVENT happened...')


@socketio.on('ping')
def handle_message():
    print('ping EVENT happened...')
    emit('pong', {'data': 'Disconnected'})


if __name__ == '__main__':
    socketio.run(app)
