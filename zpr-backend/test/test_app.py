from src import app, socketio

flask_test_client = app.test_client()

socketio_test_client = socketio.test_client(app, flask_test_client=flask_test_client)


def test_connection():
    assert socketio_test_client.is_connected()


def test_ping():
    socketio_test_client.emit("ping")
    expected = {'name': 'pong', 'args': [{'data': 'pong'}], 'namespace': '/'}
    actual = socketio_test_client.get_received()[-1]
    assert expected == actual


