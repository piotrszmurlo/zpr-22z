import { Stack, Box } from "@mui/material";
import { useState } from "react";
import Board from "./Board";
import Points from "./Points";
function Pong() {
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={2} justifyContent="center">
        <Points player1Points={player1Points} player2Points={player2Points} />
        <Board />
      </Stack>
    </Box>
  );
}

export default Pong;
