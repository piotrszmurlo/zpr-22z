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
} from "./constants.js";

const socket = io(SERVER_ADDRESS);

function App() {
  const getRandomBallSpeed = (max) => {
    return Math.floor(Math.random() * (max - 1)) + 1;
  };

  const [calculateBall, setCalculateBall] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const [ballPosition, setBallPosition] = useState({
    ballX: INITIAL_BALL_X,
    ballY: INITIAL_BALL_Y,
  });
  const [ballSpeed, setBallSpeed] = useState({
    ballSpeedX: -getRandomBallSpeed(100),
    ballSpeedY: getRandomBallSpeed(30),
  });

  const [player1Y, setPlayer1Y] = useState(10);
  const [player2Y, setPlayer2Y] = useState(10);

  const onArrowDownHandler = () => {
    socket.emit("ping");
    setPlayer1Y((y) => {
      if (y + PADDLE_HEIGHT > CANVAS_HEIGHT) {
        return y;
      } else {
        return y + 10;
      }
    });
  };

  const onArrowUpHandler = () => {
    socket.emit("ping");
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
          onArrowUpHandler();
        }
        if (event.code === "ArrowDown") {
          onArrowDownHandler();
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    createModule().then((Module) => {
      setCalculateBall(() => calculateBallWrapper(Module));
    });
  }, []);

  useEffect(() => {
    const resetBall = () => {
      setBallPosition({
        ballX: INITIAL_BALL_X,
        ballY: INITIAL_BALL_Y,
      });
      setBallSpeed({
        ballSpeedX: -getRandomBallSpeed(50),
        ballSpeedY: getRandomBallSpeed(30),
      });
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
        console.log(result);
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
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    socket.on("tick", () => {
      step();
      console.log("TICK HAPPENED");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("tick");
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

  const sendPing = () => {
    socket.emit("ping");
  };

  const startGame = () => {
    socket.emit("start");
  };

  const stopGame = () => {
    socket.emit("stop");
  };

  //te random to nie moze byc po stronie klienta
  // const resetBall = () => {
  //   setBallPosition({
  //     ballX: INITIAL_BALL_X,
  //     ballY: INITIAL_BALL_Y,
  //   });
  //   setBallSpeed({
  //     ballSpeedX: -getRandomBallSpeed(50),
  //     ballSpeedY: getRandomBallSpeed(30),
  //   });
  // };

  // function step() {
  //   const result = calculateBall(
  //     [
  //       ballPosition["ballX"],
  //       ballPosition["ballY"],
  //       ballSpeed["ballSpeedX"],
  //       ballSpeed["ballSpeedY"],
  //     ],
  //     player1Y,
  //     player2Y
  //   );
  //   if (result["ballX"] < 0) {
  //     setScore((score) => ({ ...score, player2: score["player2"] + 1 }));
  //     resetBall();
  //   } else if (result["ballX"] > CANVAS_WIDTH) {
  //     setScore((score) => ({ ...score, player1: score["player1"] + 1 }));
  //     resetBall();
  //   } else {
  //     console.log(result);
  //     setBallPosition({ ballX: result["ballX"], ballY: result["ballY"] });
  //     setBallSpeed({
  //       ballSpeedX: result["ballSpeedX"],
  //       ballSpeedY: result["ballSpeedY"],
  //     });
  //   }
  // }

  return (
    <div className="App">
      {/* <AlertDialog
        open={!isConnected}
        dialogText={CONNECTION_ERROR_TEXT}
        description={TRYING_TO_RECONNECT_TEXT}
      /> */}

      <Pong
        score={score}
        ballX={ballPosition["ballX"]}
        ballY={ballPosition["ballY"]}
        player1Y={player1Y}
        player2Y={player2Y}
      />
      <button onClick={startGame}>Start</button>
      <button onClick={stopGame}>Stop</button>
      {/* <button onClick={step}>Step</button> */}
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
}

export default App;
