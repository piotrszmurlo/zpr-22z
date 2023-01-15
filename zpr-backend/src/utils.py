from random import randint, random
from collections import OrderedDict
from .constants import \
    MAX_BALL_SPEED_X, MAX_BALL_SPEED_Y, MIN_BALL_SPEED_Y, MIN_BALL_SPEED_X


class GameState:
    """Defines server-side only game state"""
    def __init__(self):
        self.is_game_started = False
        """bool set if game is ongoing"""
        self.players = OrderedDict(player1=None, player2=None)
        """OrderedDict containing connected players'
         session id and paddle position"""
        self.test_mode = False
        """bool set only in testing, avoids endless game loop"""

    def start_game(self):
        self.is_game_started = True

    def stop_game(self):
        self.is_game_started = False


def random_ball_speed():
    """Returns random ball speed from
     range [MIN_BALL_SPEED_X, MAX_BALL_SPEED_X]"""
    x_speed = randint(MIN_BALL_SPEED_X, MAX_BALL_SPEED_X)
    y_speed = randint(MIN_BALL_SPEED_Y, MAX_BALL_SPEED_Y)
    if random() < 0.5:
        x_speed = -x_speed
    if random() < 0.5:
        y_speed = -y_speed
    return x_speed, y_speed
