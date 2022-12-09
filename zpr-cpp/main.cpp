#include <stdio.h>
#include <emscripten.h>



  
  
EMSCRIPTEN_KEEPALIVE 
int* calculateBall(int bXPos, int bYPos, int  bXVel, int bYVel,int pLeftYPos, int pRightYPos)
{
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
  int returnArray[4];
  returnArray[0]=bXPos;
  returnArray[1]=bYPos;
  returnArray[2]=bXVel;
  returnArray[3]=bYVel;
  return returnArray;
}