import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

function Board() {
  const canvas_width = 1000;
  const canvas_height = 800;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvas_width, canvas_height).parent(canvasParentRef);
  };

  const onArrowDown = () => {
    setPlayer1Y((y) => {
      if (y + 150 > canvas_height) {
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

  const [ballX, setBallX] = useState(canvas_width / 2);
  const [ballY, setBallY] = useState(canvas_height / 2);

  const player1X = 10;
  const player2X = 960;
  const paddleWidth = 30;
  const paddleHeight = 150;
  const ballRadius = 30;

  const [player1Y, setPlayer1Y] = useState(10);
  const [player2Y, setPlayer2Y] = useState(10);

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "120vh",
  };

  const draw = (p5) => {
    p5.background(0);
    p5.fill(p5.color(255));
    p5.rect(player1X, player1Y, paddleWidth, paddleHeight);
    p5.rect(player2X, player2Y, paddleWidth, paddleHeight);
    p5.ellipse(ballX, ballY, ballRadius);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default Board;