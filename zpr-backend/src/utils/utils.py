from random import randint, random
from collections import OrderedDict
from src.utils import MIN_BALL_SPEED_Y, MIN_BALL_SPEED_X, MAX_BALL_SPEED_Y, MAX_BALL_SPEED_X


class GameState:
    def __init__(self):
        self.is_game_started = False
        self.players = OrderedDict(player1=None, player2=None)

    def start_game(self):
        self.is_game_started = True

    def stop_game(self):
        self.is_game_started = False


def random_ball_speed():
    x_speed = randint(MIN_BALL_SPEED_X, MAX_BALL_SPEED_X)
    y_speed = randint(MIN_BALL_SPEED_Y, MAX_BALL_SPEED_Y)
    if random() < 0.5:
        x_speed = -x_speed
    if random() < 0.5:
        y_speed = -y_speed
    return x_speed, y_speed


