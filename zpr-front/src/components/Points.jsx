import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import PropTypes from 'prop-types'

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
