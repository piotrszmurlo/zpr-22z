from collections import OrderedDict
from src.app import app as flask_app, socketio, state
socketio.init_app(flask_app)
flask_test_client = flask_app.test_client()

state.test_mode = True


def test_handle_connect():
    assert state.players == OrderedDict(player1=None, player2=None)
    test_client_1 = socketio.test_client(flask_app, flask_test_client=flask_test_client)
    assert test_client_1.is_connected()
    assert state.players['player1']['paddle_y'] == 10
    assert state.players['player1']['sid'] is not None
    expected_received_1 = {'name': 'player_assignment', 'args': [{'player': 'player1'}], 'namespace': '/'}
    assert test_client_1.get_received()[0] == expected_received_1
    test_client_2 = socketio.test_client(flask_app)
    assert state.players['player2']['paddle_y'] == 10
    assert state.players['player2']['sid'] is not None
    expected_received_2 = {'name': 'player_assignment', 'args': [{'player': 'player2'}], 'namespace': '/'}
    assert test_client_2.get_received()[0] == expected_received_2


def test_handle_disconnect():
    test_client = socketio.test_client(flask_app)
    assert test_client.is_connected()
    state.is_game_started = True
    test_client.disconnect()
    assert state.is_game_started is False


def test_stop_game():
    test_client_1 = socketio.test_client(flask_app)
    test_client_2 = socketio.test_client(flask_app)
    state.is_game_started = True
    test_client_1.emit('stop')
    assert state.is_game_started is False
    assert test_client_1.get_received()[-1]['name'] == 'game_stopped'
    assert test_client_2.get_received()[-1]['name'] == 'game_stopped'


def test_reset_ball():
    test_client_1 = socketio.test_client(flask_app)
    test_client_2 = socketio.test_client(flask_app)
    state.is_game_started = True
    test_client_1.emit('reset_ball')
    assert state.is_game_started is False
    client_1_received = test_client_1.get_received()
    client_2_received = test_client_2.get_received()
    assert client_1_received[-1]['name'] == 'reset_ball_response'
    assert client_2_received[-1]['name'] == 'reset_ball_response'
    assert client_2_received[-1]['args'][0]['x_speed'] is not None
    assert client_2_received[-1]['args'][0]['y_speed'] is not None


def test_start_game():
    test_client_1 = socketio.test_client(flask_app)
    test_client_2 = socketio.test_client(flask_app)
    test_client_1.emit('start')
    assert state.is_game_started is True
    client_1_received = test_client_1.get_received()
    client_2_received = test_client_2.get_received()
    assert client_1_received[0]['name'] == 'game_started'
    assert client_2_received[0]['name'] == 'game_started'
    assert client_1_received[-1]['name'] == 'tick'
    assert client_1_received[-1]['name'] == 'tick'


def test_start_already_started_game():
    test_client = socketio.test_client(flask_app)
    state.is_game_started = True
    test_client.emit('start')
    assert state.is_game_started is True
    assert test_client.get_received() == []


def test_move_paddle_if_game_is_not_started():
    test_client = socketio.test_client(flask_app)
    state.is_game_started = False
    test_client.emit('move_paddle', {'direction': 'up'})
    assert test_client.get_received() == []


