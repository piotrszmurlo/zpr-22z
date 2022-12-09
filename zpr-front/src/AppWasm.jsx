import React, { useState, useEffect } from "react";
import "./App.css";
import createModule from "./engine.mjs";

function calculateBallWrapper(Module) {
  return function (ballCoordinates, leftPaddleY, rightPaddleY) {
    const ballArr = new Int32Array(ballCoordinates);
    console.log(ballArr);
    const length = ballArr.length;
    const buffer = Module._malloc(length * ballArr.BYTES_PER_ELEMENT);
    const resultBuffer = Module._malloc(length * ballArr.BYTES_PER_ELEMENT);
    Module.HEAP32.set(ballArr, buffer >> 2);
    const resultPointer = Module.ccall(
      "calculateBall",
      "number",
      ["number", "number", "number", "number"],
      [buffer, leftPaddleY, rightPaddleY, resultBuffer]
    );
    console.log(resultBuffer);
    console.log(resultPointer);
    const resultArray = [];
    for (let i = 0; i < length; i++) {
      resultArray.push(
        Module.HEAP32[resultBuffer / Int32Array.BYTES_PER_ELEMENT + i]
      );
    }
    Module._free(buffer);
    Module._free(resultBuffer);
    return resultArray;
  };
}

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
