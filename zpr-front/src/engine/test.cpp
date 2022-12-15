#include <catch2/catch_test_macros.hpp>

#include <cstdint>

int calculateBall(int* ball,int pLeftYPosition, int pRightYPosition, int* result);

TEST_CASE(testBall)
{
    int ball = {25, 40, -10, -10};
    int pLeftYPosition = 30;
    int pRightYPosition = 300;
    int result = {0,0,0,0};
    REQUIRE(calculateBall(int* ball,int pLeftYPosition, int pRightYPosition, int* result) == {35, 50, 10, 10});
    int ball = {980, 60, 10, 10};
    REQUIRE(calculateBall(int* ball,int pLeftYPosition, int pRightYPosition, int* result) == {970, 50, -10, -10});
}