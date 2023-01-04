import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function AlertDialog(props) {
  return (
    <Box>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          <Box
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              padding: 3,
              width: 200,
            }}
          >
            {props.circularProgress && (
              <CircularProgress style={{ margin: "0 auto" }} />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AlertDialog;
