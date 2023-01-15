import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * AlertDialog component used to notify user with important information
 * @param props.open: bool indicating whether to show the dialog
 * @param props.dialogText: string of dialog main text
 * @param props.description: string of dialog secondary text
 * @param props.circularProgress: bool indicating whether to show circular progress
 * @returns react component
 */
function AlertDialog(props) {
  return (
    <Box>
      <Dialog open={props.open} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{props.dialogText}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{props.description}</DialogContentText>
          <Box
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              padding: 3,
              width: 200
            }}
          >
            {props.circularProgress && <CircularProgress style={{ margin: '0 auto' }} />}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  dialogText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  circularProgress: PropTypes.bool.isRequired
}

export default AlertDialog
