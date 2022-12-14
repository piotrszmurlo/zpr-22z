import { Box, Typography, Stack } from "@mui/material";

function Points(props) {
  return (
    <Box>
      <Stack direction="row" spacing={110}>
        <Typography variant="h1" gutterBottom>
          {props.score["player1"]}
        </Typography>
        <Typography variant="h1" gutterBottom>
          {props.score["player2"]}
        </Typography>
      </Stack>
    </Box>
  );
}

export default Points;
