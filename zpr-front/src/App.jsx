import React, { useState, useEffect } from "react";
import createModule from "./engine.mjs";
import calculateBallWrapper from "./calculateBallWrapper.js";
import io from "socket.io-client";
import Pong from "./components/Pong";
import AlertDialog from "./components/Dialog.jsx";
import {
  CONNECTION_ERROR_TEXT,
  TRYING_TO_RECONNECT_TEXT,
  WASM_LOADING_TEXT,
  SERVER_ADDRESS,
  INITIAL_BALL_X,
  INITIAL_BALL_Y,
  CANVAS_WIDTH,
  PADDLE_HEIGHT,
  CANVAS_HEIGHT,
  GAME_STOPPED_TEXT,
  GAME_STOPPED_TEXT_SECONDARY,
} from "./constants.js";

const socket = io(SERVER_ADDRESS);

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [calculateBall, setCalculateBall] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [playerNumber, setPlayerNumber] = useState();

  const [ballPosition, setBallPosition] = useState({
    ballX: INITIAL_BALL_X,
    ballY: INITIAL_BALL_Y,
  });
  const [ballSpeed, setBallSpeed] = useState({
    ballSpeedX: 0,
    ballSpeedY: 0,
  });

  const [player1Y, setPlayer1Y] = useState(10);
  const [player2Y, setPlayer2Y] = useState(10);

  const stopGame = () => {
    socket.emit("stop");
  };

  const onArrowDownHandler = () => {
    setPlayer1Y((y) => {
      if (y + PADDLE_HEIGHT > CANVAS_HEIGHT) {
        return y;
      } else {
        return y + 10;
      }
    });
  };

  const onArrowUpHandler = () => {
    setPlayer1Y((y) => {
      if (y <= 0) {
        return y;
      } else {
        return y - 10;
      }
    });
  };

  useEffect(() => {
    const onSpacebarHandler = () => {
      if (isConnected) {
        socket.emit("start");
      }
    };
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.code === "ArrowUp") {
          onArrowUpHandler();
        }
        if (event.code === "ArrowDown") {
          onArrowDownHandler();
        }
        if (event.code === "Space") {
          onSpacebarHandler();
        }
      },
      false
    );
  }, [isConnected]);

  useEffect(() => {
    createModule().then((Module) => {
      setCalculateBall(() => calculateBallWrapper(Module));
    });
  }, []);

  useEffect(() => {
    socket.on("reset_ball_response", (data) => {
      setBallPosition({
        ballX: INITIAL_BALL_X,
        ballY: INITIAL_BALL_Y,
      });
      setBallSpeed({
        ballSpeedX: data["x_speed"],
        ballSpeedY: data["y_speed"],
      });
    });

    socket.on("player_assignment", (data) => {
      setPlayerNumber(data["player"]);
    });

    socket.on("game_started", (data) => {
      console.log("GOT GAME START");
      setIsGameStarted(true);
    });

    socket.on("game_stopped", (data) => {
      console.log("GOT GAME STOP");
      setIsGameStarted(false);
    });

    const resetBall = () => {
      socket.emit("reset_ball");
    };

    function step() {
      const result = calculateBall(
        [
          ballPosition["ballX"],
          ballPosition["ballY"],
          ballSpeed["ballSpeedX"],
          ballSpeed["ballSpeedY"],
        ],
        player1Y,
        player2Y
      );
      if (result["ballX"] < 0) {
        setScore((score) => ({ ...score, player2: score["player2"] + 1 }));
        resetBall();
      } else if (result["ballX"] > CANVAS_WIDTH) {
        setScore((score) => ({ ...score, player1: score["player1"] + 1 }));
        resetBall();
      } else {
        setBallPosition({ ballX: result["ballX"], ballY: result["ballY"] });
        setBallSpeed({
          ballSpeedX: result["ballSpeedX"],
          ballSpeedY: result["ballSpeedY"],
        });
      }
    }

    socket.on("connect", () => {
      console.log("Connected");
      setIsConnected(true);
      resetBall();
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
      setIsConnected(false);
      stopGame();
    });

    socket.on("tick", () => {
      step();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("tick");
      socket.off("reset_ball_response");
      socket.off("player_assignment");
      socket.off("game_stopped");
      socket.off("game_started");
    };
  }, [ballPosition, ballSpeed, calculateBall, player1Y, player2Y]);

  if (!calculateBall) {
    return (
      <AlertDialog
        open={true}
        dialogText={WASM_LOADING_TEXT}
        description={""}
      />
    );
  }

  return (
    <div className="App">
      <AlertDialog
        open={!isConnected}
        dialogText={CONNECTION_ERROR_TEXT}
        description={TRYING_TO_RECONNECT_TEXT}
        circularProgress={true}
      />
      <AlertDialog
        open={isConnected && !isGameStarted}
        dialogText={GAME_STOPPED_TEXT}
        description={GAME_STOPPED_TEXT_SECONDARY}
        circularProgress={false}
      />

      <Pong
        score={score}
        ballX={ballPosition["ballX"]}
        ballY={ballPosition["ballY"]}
        player1Y={player1Y}
        player2Y={player2Y}
      />
    </div>
  );
}

export default App;
