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
} from "./constants.js";

const socket = io(SERVER_ADDRESS);

function App() {
  const getRandomBallSpeed = (max) => {
    return Math.floor(Math.random() * (max - 1)) + 1;
  };

  const [calculateBall, setCalculateBall] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);

  const [ballPosition, setBallPosition] = useState({
    ballX: INITIAL_BALL_X,
    ballY: INITIAL_BALL_Y,
  });
  const [ballSpeed, setBallSpeed] = useState({
    ballSpeedX: getRandomBallSpeed(20),
    ballSpeedY: getRandomBallSpeed(20),
  });

  useEffect(() => {
    createModule().then((Module) => {
      setCalculateBall(() => calculateBallWrapper(Module));
    });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
      console.log("PONG EVENT CALLBACK");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

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

  function step() {
    const result = calculateBall(
      [
        ballPosition["ballX"],
        ballPosition["ballY"],
        ballSpeed["ballSpeedX"],
        ballSpeed["ballSpeedY"],
      ],
      50,
      50
    );
    console.log(result);
    setBallPosition({ ballX: result["ballX"], ballY: result["ballY"] });
    setBallSpeed({
      ballSpeedX: result["ballSpeedX"],
      ballSpeedY: result["ballSpeedY"],
    });
  }

  const check = calculateBall([200, 400, 5, 5], 50, 50);
  return (
    <div className="App">
      {/* <AlertDialog
        open={!isConnected}
        dialogText={CONNECTION_ERROR_TEXT}
        description={TRYING_TO_RECONNECT_TEXT}
      /> */}
      <button onClick={step}>Step</button>
      <p>{JSON.stringify(check)}</p>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
      <Pong
        player1Points={player1Points}
        player2Points={player2Points}
        ballX={ballPosition["ballX"]}
        ballY={ballPosition["ballY"]}
      />
    </div>
  );
}

export default App;
