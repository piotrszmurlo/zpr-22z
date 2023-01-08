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

  const draw = (p5) => {
    p5.background(0);
    p5.fill(p5.color(255));
    p5.rect(PLAYER1_X, props.player1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    p5.rect(PLAYER2_X, props.player2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    p5.ellipse(props.ballX, props.ballY, BALL_RADIUS);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default Board;
