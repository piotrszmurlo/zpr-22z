#include <stdio.h>
#include <emscripten.h>



extern "C" {
  
  EMSCRIPTEN_KEEPALIVE 
  int* calculateBall(int* ball,int pLeftYPosition, int pRightYPosition, int* result)
  {
    int sizeX = 1000;
    int sizeY = 800;
    int pWidth = 30;
    int pHeight = 150;
    int bWidth = 15;
    int bHeight = 15;
    int pXPosition = 10;
    if(std::end(ball)-std::begin(ball)!=4)
      {
        return result;
      }
    int bXPosition = ball[0]; 
    int bYPosition = ball[1]; 
    int bXVel = ball[2];
    int bYVel = ball[3];
    
    //did ball hit paddle
    if (bXPosition - bWidth <=pWidth + pXPosition)
        {
          if(bYPosition+bHeight > pLeftYPosition-pHeight && bYPosition-bHeight < pLeftYPosition)
          {
            bXVel = bXVel * -1;
            bYVel = bYVel * -1;
          }   
        }
    else if (bXPosition + bWidth>=sizeX - pWidth - pXPosition)
      {
        if(bYPosition + bHeight > pLeftYPosition-pHeight && bYPosition - bHeight < pLeftYPosition)
        {
          bXVel = bXVel * -1;
          bYVel = bYVel * -1;
        }
      } 
    //did ball hit wall
    else if(bYPosition+bHeight>=sizeY || bYPosition<=0)
      {
        bYVel=bYVel*-1; 
      }

    bXPosition += bXVel;
    bYPosition += bYVel;

    result[0]=bXPosition;
    result[1]=bYPosition;
    result[2]=bXVel;
    result[3]=bYVel;
    return result;
  }
}