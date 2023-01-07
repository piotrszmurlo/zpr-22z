#include <stdio.h>
#include <iterator>
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

    // if(std::end(ball)-std::begin(ball)!=4)
    //   {
    //     return result;
    //   }
    
    int bXPosition = ball[0]; 
    int bYPosition = ball[1]; 
    int bXVelocity = ball[2];
    int bYVelocity = ball[3];
    
    //did ball hit paddle
    if ((bXPosition - bWidth <= pWidth + pXPosition)
      {
        if(bYPosition + bHeight > pLeftYPosition - pHeight && bYPosition - bHeight < pLeftYPosition)
          {
            bXVelocity = bXVelocity * -1;
            bYVelocity = bYVelocity * -1;
          }   
        }
    else if (bXPosition + bWidth >= sizeX - pWidth - pXPosition)
      {
        if(bYPosition + bHeight > pRightYPosition - pHeight && bYPosition - bHeight < pRightYPosition)
        {
          bXVelocity = bXVelocity * -1;
          bYVelocity = bYVelocity * -1;
        }
      } 
    //did ball hit wall
    else if((bYPosition+bHeight)>=sizeY || (bYPosition-bHeight)<=0)
      {
        bYVelocity=bYVelocity*-1; 
      }
    
    bXPosition += bXVelocity;
    bYPosition += bYVelocity;

    result[0]=bXPosition;
    result[1]=bYPosition;
    result[2]=bXVelocity;
    result[3]=bYVelocity;
    return result;
  }
}