#include <stdio.h>
#include <iterator>
// #include <emscripten.h>



extern "C" {
  
  // EMSCRIPTEN_KEEPALIVE 
  int* calculateBall(int* ball,int pLeftYPosition, int pRightYPosition, int* result)
  {
    int sizeX = 1000;
    int sizeY = 800;
    int pWidth = 30;
    int pHeight = 150;
    int bWidth = 15;
    int bHeight = 15;
    int pXPosition = 10;
    int bXPosition = ball[0]; 
    int bYPosition = ball[1]; 
    int bXSpeed = ball[2];
    int bYSpeed = ball[3];
    
    // did ball hit paddle
    if (bXPosition - bWidth <= pWidth + pXPosition)
      {
        if((bYPosition + bHeight > pLeftYPosition) && (bYPosition - bHeight < pLeftYPosition + pHeight))
          {
            bXSpeed = bXSpeed * -1;;
          }   
        }
    else if (bXPosition + bWidth >= sizeX - pWidth - pXPosition)
      {
        if((bYPosition + bHeight > pRightYPosition) && (bYPosition - bHeight < pRightYPosition + pHeight))
        {
          bXSpeed = bXSpeed * -1;
        }
      } 
    // did ball hit wall
	if((bYPosition+bHeight)>=sizeY || (bYPosition-bHeight)<=0)
      {
        bYSpeed=bYSpeed*-1; 
      }
    
    bXPosition += bXSpeed;
    bYPosition += bYSpeed;

    result[0]=bXPosition;
    result[1]=bYPosition;
    result[2]=bXSpeed;
    result[3]=bYSpeed;
    return result;
  }
}