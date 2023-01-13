from collections import OrderedDict

from src.utils import GameState


def test_game_state():
    state = GameState()
    assert state.players == OrderedDict(player1=None, player2=None)
    assert state.test_mode is False
    assert state.is_game_started is False
    state.stop_game()
    assert state.is_game_started is False
    state.start_game()
    assert state.is_game_started is True