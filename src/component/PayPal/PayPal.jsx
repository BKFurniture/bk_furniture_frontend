import React, {useState, useEffect} from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
const CLIENT_ID =
  'Aa3lgCcjffkRUxZMdxg4iWal8Fsti0PHaBve8hAUA6ic4i72U7WUpECosl-L_H-ht8M1A8yiFMJF_foL'
const Checkout = ({open, onClose, onSuccess, cost}) => {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState('')
  const [orderID, setOrderID] = useState(false)

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Sunflower',
            amount: {
              currency_code: 'USD',
              value: cost,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID)
        return orderID
      })
  }

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const {payer} = details
      setSuccess(true)
    })
  }

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage('An Error occured with your payment ')
  }

  useEffect(() => {
    if (success) {
      onSuccess()
    }
  }, [success])

  return (
    <PayPalScriptProvider options={{'client-id': CLIENT_ID}}>
      <div>
        <Dialog
          open={success ? false : open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <PayPalButtons
                style={{layout: 'vertical'}}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </PayPalScriptProvider>
  )
}

export default Checkout
