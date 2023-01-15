import createModule from "../engine.mjs";

const ballCoordinates = new Int32Array([170, 170, 10, 10])
const leftPaddleY = 170
const rightPaddleY = 320

let Module = {}

createModule().then((mod) => {
  Module = mod
  const ballArr = new Int32Array(ballCoordinates)
  const length = ballArr.length
  const buffer = Module._malloc(length * ballArr.BYTES_PER_ELEMENT)
  const resultBuffer = Module._malloc(length * ballArr.BYTES_PER_ELEMENT)
  Module.HEAP32.set(ballArr, buffer >> 2)
  Module.ccall('calculateBall', 'number', ['number', 'number', 'number', 'number'], [buffer, leftPaddleY, rightPaddleY, resultBuffer])
  const resultLabels = ['ballX', 'ballY', 'ballSpeedX', 'ballSpeedY']
  const results = {}
  resultLabels.forEach((label, i) => {
    results[label] = Module.HEAP32[resultBuffer / Int32Array.BYTES_PER_ELEMENT + i]
  })
  console.log(results)
  Module._free(buffer)
  Module._free(resultBuffer)
})

