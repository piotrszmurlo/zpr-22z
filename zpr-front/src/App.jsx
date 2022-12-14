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
} from "./constants.js";

const ENDPOINT = "http://127.0.0.1:5000/";
const socket = io(ENDPOINT);

function App() {
  const [calculateBall, setCalculateBall] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);

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

  const result = calculateBall([200, 400, 5, 5], 50, 50);
  return (
    <div className="App">
      <AlertDialog
        open={!isConnected}
        dialogText={CONNECTION_ERROR_TEXT}
        description={TRYING_TO_RECONNECT_TEXT}
      />
      <p>{JSON.stringify(result)}</p>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
      <Pong player1Points={player1Points} player2Points={player2Points} />
    </div>
  );
}

export default App;
