import {Alert, Snackbar} from '@mui/material'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setSnackbar} from 'store/appSlice'

const SnackbarProvider = (props) => {
  const {open, severity, message} = useSelector((state) => state.app.snackbar)
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(setSnackbar(false))
  }
  return (
    <>
      {props.children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        message="I love snacks"
      >
        <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SnackbarProvider
