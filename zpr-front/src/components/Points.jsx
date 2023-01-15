import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * Points component shows players' score based on props.score
 * @param props.score: coordinate y of player1's paddle
 * in format {'player1': NUM_POINTS, 'player2': NUM_POINTS}
 * @returns react component
 */
function Points(props) {
  return (
    <Box>
      <Stack direction='row' spacing={110}>
        <Typography variant='h1' gutterBottom>
          {props.score['player1']}
        </Typography>
        <Typography variant='h1' gutterBottom>
          {props.score['player2']}
        </Typography>
      </Stack>
    </Box>
  )
}

Points.propTypes = {
  score: PropTypes.exact({
    player1: PropTypes.number.isRequired,
    player2: PropTypes.number.isRequired
  })
}

export default Points
