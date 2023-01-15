import React from 'react'
import { Stack, Box } from '@mui/material'
import Board from './Board'
import Points from './Points'
import PropTypes from 'prop-types'

/**
 * Utility component aggregating and positioning Points and Board components
 * @param props.score: coordinate y of player1's paddle
 * in format {'player1': NUM_POINTS, 'player2': NUM_POINTS}
 * @param props.player1Y: coordinate y of player1's paddle
 * @param props.player2Y: coordinate y of player2's paddle
 * @param props.ballX: coordinate x of the ball
 * @param props.ballY: coordinate y of the ball
 * @returns react component
 */
function Pong(props) {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Stack spacing={2} justifyContent='center'>
        <Points score={props.score} />
        <Board ballX={props.ballX} ballY={props.ballY} player1Y={props.player1Y} player2Y={props.player2Y} />
      </Stack>
    </Box>
  )
}

Pong.propTypes = {
  score: PropTypes.number.isRequired,
  ballX: PropTypes.number.isRequired,
  ballY: PropTypes.number.isRequired,
  player1Y: PropTypes.number.isRequired,
  player2Y: PropTypes.number.isRequired
}

export default Pong
