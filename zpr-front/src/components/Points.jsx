import { Box, Typography, Stack } from "@mui/material";

function Points(props) {
  return (
    <Box>
      <Stack direction="row" spacing={110}>
        <Typography variant="h1" gutterBottom>
          {props.player1Points}
        </Typography>
        <Typography variant="h1" gutterBottom>
          {props.player2Points}
        </Typography>
      </Stack>
    </Box>
  );
}

export default Points;
