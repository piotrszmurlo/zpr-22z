# Main entrypoint for the server app

from src.app import socketio, app

if __name__ == '__main__':
    socketio.init_app(app)
    socketio.run(app)