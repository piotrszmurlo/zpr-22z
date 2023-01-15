#include <stdio.h>
#include <iterator>
#include <emscripten.h>



extern "C" {

  EMSCRIPTEN_KEEPALIVE
  int* calculateBall(int* ball, int pLeftYPosition,
    int pRightYPosition, int* result) {
    int sizeX = 1000;
    int sizeY = 800;
    int pWidth = 30;
    int pHeight = 150;
    int bRadius = 15;
    int pXPosition = 10;
    int bXPosition = ball[0];
    int bYPosition = ball[1];
    int bXSpeed = ball[2];
    int bYSpeed = ball[3];

    // did ball hit paddle
    if (bXPosition - bRadius <= pWidth + pXPosition) {
        if (bYPosition + bRadius > pLeftYPosition &&
         bYPosition - bRadius < pLeftYPosition + pHeight) {
            bXSpeed = bXSpeed * -1;
          }
    } else if (bXPosition + bRadius >= sizeX - pWidth - pXPosition) {
        if (bYPosition + bRadius > pRightYPosition &&
        bYPosition - bRadius < pRightYPosition + pHeight) {
          bXSpeed = bXSpeed * -1;
        }
      }
    // did ball hit wall
    if (bYPosition + bRadius >= sizeY || bYPosition - bRadius <= 0) {
        bYSpeed = bYSpeed*-1;
      }

    bXPosition += bXSpeed;
    bYPosition += bYSpeed;

    result[0] = bXPosition;
    result[1] = bYPosition;
    result[2] = bXSpeed;
    result[3] = bYSpeed;
    return result;
  }
}
