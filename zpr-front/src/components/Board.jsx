import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER1_X,
  PLAYER2_X,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
} from "../constants.js";

function Board(props) {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
  };

  const onArrowDown = () => {
    setPlayer1Y((y) => {
      if (y + 150 > CANVAS_HEIGHT) {
        return y;
      } else {
        return y + 10;
      }
    });
  };

  const onArrowUp = () => {
    setPlayer1Y((y) => {
      if (y <= 0) {
        return y;
      } else {
        return y - 10;
      }
    });
  };

  useEffect(() => {
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.code === "ArrowUp") {
          onArrowUp();
        }
        if (event.code === "ArrowDown") {
          onArrowDown();
        }
      },
      false
    );
  }, []);

  const [player1Y, setPlayer1Y] = useState(10);
  const [player2Y, setPlayer2Y] = useState(10);

  const draw = (p5) => {
    p5.background(0);
    p5.fill(p5.color(255));
    p5.rect(PLAYER1_X, player1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    p5.rect(PLAYER2_X, player2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    p5.ellipse(props.ballX, props.ballY, BALL_RADIUS);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default Board;
