#include "engine.test.version.cpp"
#define CATCH_CONFIG_MAIN
#include "catch.hpp"
#include <iostream>
using namespace std;

TEST_CASE("Ball moving", "[vector]"){
  int ballCoordinates[] = {170, 170, 10, 10};
  int leftPaddleY = 170;
  int rightPaddleY = 320;
  int results[] = {0,0,0,0};
  int expectedResults[] = {180, 180, 10, 10};

  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }
}

TEST_CASE("Ball hitting wall", "Wall"){
  int ballCoordinates[] = {170, 790,  10, 10};
  int leftPaddleY = 170;
  int rightPaddleY = 320;
  int results[] = {0,0,0,0};
  int expectedResults[] = {180, 780, 10, -10};

  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }

  ballCoordinates[1] = 10;
  ballCoordinates[3] = -10;
  expectedResults[1] = 20;
  expectedResults[3] = 10;
  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }
}

TEST_CASE("Ball hitting right paddle", "RightPaddle"){
  int ballCoordinates[] = { 970, 170, 10, 10};
  int leftPaddleY = 170;
  int rightPaddleY = 170;
  int results[] = {0,0,0,0};
  int expectedResults[] = {960, 180, -10, 10};
  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }
  
  ballCoordinates[0] = 245;
  expectedResults[0] = 255;
  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }


  ballCoordinates[0] = 320;
  expectedResults[0] = 320;
  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }
}

TEST_CASE("Ball hitting left paddle", "LeftPaddle"){
  int ballCoordinates[] = { 20, 170, -10, 10};
  int leftPaddleY = 170;
  int rightPaddleY = 170;
  int results[] = {0,0,0,0};
  int expectedResults[] = { 30, 180, 10, 10};

  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }
  
  ballCoordinates[0] = 245;
  expectedResults[0] = 255;
  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }

  ballCoordinates[1] = 320;
  expectedResults[1] = 330;
  calculateBall(ballCoordinates, leftPaddleY, rightPaddleY, results);
  for(int i =0; i<4; i++)
  {
  REQUIRE(results[i]==expectedResults[i]);
  }
}