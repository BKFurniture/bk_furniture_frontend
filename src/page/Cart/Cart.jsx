import {
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import {Box, Container} from '@mui/system'
import React, {useState} from 'react'
import StepContent from './StepContent'
import Total from './Total/Total'
import orderApi from 'api/order'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setSnackbar} from 'store/appSlice'
import {useDispatch} from 'react-redux'
import {setCartItems} from 'store/cartSlice'

const STEPS = ['Review cart', 'Shipping address', 'Proceed payment']
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)
  const {cartItems, total, address, paymentMethod} = useSelector(
    (state) => state.cart,
  )
  const handlePlaceOrder = () => {
    orderApi
      .checkout({
        recipient_name: address.fullName,
        address: address.location,
        mobile: address.phoneNumber,
        discount: 0,
        total_price: total,
        payment_method: paymentMethod,
        order_items: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          sub_total: Number(item.quantity * item.price),
        })),
      })
      .then((res) => {
        dispatch(setCartItems([]))
        dispatch(
          setSnackbar({
            open: true,
            message: 'Place order successfully!',
            severity: 'success',
          }),
        )

        navigate('/orders')
      })
  }
  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        style={{color: '#1264A9', fontWeight: 700, marginBottom: 20}}
      >
        Cart
      </Typography>
      <Box sx={{width: '100%'}}>
        <Stepper activeStep={step} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid container style={{marginTop: 20}} spacing={1}>
        <Grid item xs={12} md={9}>
          <StepContent step={step} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Total />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        style={{marginTop: 20}}
        spacing={2}
      >
        {step > 0 && (
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setStep(step - 1)
              }}
            >
              Previous Step
            </Button>
          </Grid>
        )}

        {step < 2 && cartItems.length > 0 && (
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setStep(step + 1)
              }}
            >
              Next Step
            </Button>
          </Grid>
        )}
        {step === 2 && (
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={handlePlaceOrder}
            >
              Place order
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Cart
