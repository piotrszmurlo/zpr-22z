from random import randint, random

from src.utils import MIN_BALL_SPEED_Y, MIN_BALL_SPEED_X, MAX_BALL_SPEED_Y, MAX_BALL_SPEED_X


def random_ball_speed():
    x_speed = randint(MIN_BALL_SPEED_X, MAX_BALL_SPEED_X)
    y_speed = randint(MIN_BALL_SPEED_Y, MAX_BALL_SPEED_Y)
    if random() < 0.5:
        x_speed = -x_speed
    if random() < 0.5:
        y_speed = -y_speed
    return x_speed, y_speed
