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
        <Points score={props.score} />
        <Board
          ballX={props.ballX}
          ballY={props.ballY}
          player1Y={props.player1Y}
          player2Y={props.player2Y}
        />
      </Stack>
    </Box>
  );
}

export default Pong;
