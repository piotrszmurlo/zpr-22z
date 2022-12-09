function calculateBallWrapper(Module) {
  return function (ballCoordinates, leftPaddleY, rightPaddleY) {
    const ballArr = new Int32Array(ballCoordinates);
    const length = ballArr.length;
    const buffer = Module._malloc(length * ballArr.BYTES_PER_ELEMENT);
    const resultBuffer = Module._malloc(length * ballArr.BYTES_PER_ELEMENT);
    Module.HEAP32.set(ballArr, buffer >> 2);
    Module.ccall(
      "calculateBall",
      "number",
      ["number", "number", "number", "number"],
      [buffer, leftPaddleY, rightPaddleY, resultBuffer]
    );
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

export default calculateBallWrapper;
