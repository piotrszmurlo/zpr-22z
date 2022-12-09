#include <stdio.h>
#include <emscripten.h>



  
  
EMSCRIPTEN_KEEPALIVE 
int* calculateBall(int* ball,int pLeftYPos, int pRightYPos)
{
  int bXPos = ball[0]; 
  int bYPos = ball[1]; 
  int bXVel = ball[2];
  int bYVel = ball[3];
  int sizeX = 1000;
  int sizeY = 800;
  int pWidth = 30;
  int pHeight = 150;
  int bWidth = 15;
  int bHeight = 15;
  //did ball hit paddle
  if (bXPos - bWidth <=pWidth)
      {
        if(bYPos+bHeight > pLeftYPos-pHeight && bYPos-bHeight < pLeftYPos)
        {
          bXVel = bXVel * -1;
          bYVel = bYVel * -1;
        }   
      }

  else if (bXPos>=sizeX-pWidth)
    {
      if(bYPos + bHeight > pLeftYPos-pHeight && bYPos - bHeight < pLeftYPos)
      {
        bXVel = bXVel * -1;
        bYVel = bYVel * -1;
      }
    } 
  //did ball hit wall
  else if(bYPos+bHeight>=sizeY || bYPos<=0)
    {
      bYVel=bYVel*-1; 
    }

  bXPos += bXVel;
  bYPos += bYVel;

  ball[0]=bXPos;
  ball[1]=bYPos;
  ball[2]=bXVel;
  ball[3]=bYVel;
  return ball;
}