import { Stack, Box } from "@mui/material";
import Board from "./Board";
import Points from "./Points";

function Pong(props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={2} justifyContent="center">
        <Points
          player1Points={props.player1Points}
          player2Points={props.player2Points}
        />
        <Board ballX={props.ballX} ballY={props.ballY} />
      </Stack>
    </Box>
  );
}

export default Pong;
