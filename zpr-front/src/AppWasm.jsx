import React, { useState, useEffect } from "react";
import createModule from "./engine.mjs";
import calculateBallWrapper from "./calculateBallWrapper.js";

import socketIO from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000/";

function AppWasm() {
  const [calculateBall, setCalculateBall] = useState();

  useEffect(() => {
    createModule().then((Module) => {
      setCalculateBall(() => calculateBallWrapper(Module));
    });
  }, []);

  useEffect(() => {
    const socket = socketIO.connect(ENDPOINT);
    console.log("connected", socket);
    // socket.on("success", (data) => console.log(data));

    // socket.on("FetchRecords");
    // socket.emit("FetchRecords");
    // socket.on("SendingRecords", setRecords);
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // });
  }, []);

  if (!calculateBall) {
    return "Loading webassembly...";
  }
  const result = calculateBall([200, 400, 5, 5], 50, 50);
  return <div className="App">{JSON.stringify(result)}</div>;
}

export default AppWasm;
