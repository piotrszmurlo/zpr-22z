import React, { useState, useEffect } from "react";
import createModule from "./engine.mjs";
import calculateBallWrapper from "./calculateBallWrapper.js";

function AppWasm() {
  const [calculateBall, setCalculateBall] = useState();

  useEffect(() => {
    createModule().then((Module) => {
      setCalculateBall(() => calculateBallWrapper(Module));
    });
  }, []);

  if (!calculateBall) {
    return "Loading webassembly...";
  }
  const result = calculateBall([200, 400, 5, 5], 50, 50);
  return <div className="App">{JSON.stringify(result)}</div>;
}

export default AppWasm;
