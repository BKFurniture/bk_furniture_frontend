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
import {mailerCheckout} from 'api/mailer'

const STEPS = ['Review cart', 'Shipping address', 'Proceed payment']
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)
  const {cartItems, total, address, paymentMethod, discount} = useSelector(
    (state) => state.cart,
  )
  const {email, username} = useSelector((state) => state.user)
  const handlePlaceOrder = () => {
    const orderField = {total_price: total}
    if (discount?.code) {
      ;(orderField.discount = discount.code),
        (orderField.total_price = (
          (total * (100 - discount.percent)) /
          100
        ).toFixed(2))
    }
    orderApi
      .checkout({
        ...orderField,
        recipient_name: address.fullName,
        address: address.location,
        mobile: address.phoneNumber,
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
        mailerCheckout(username, email, {
          address: res.address,
          phone: res.mobile,
          payMethod: res.payment_method,
          shippingOption: 'GHTK',
          deliveryDate: res.delivery_date,
          subTotal: res.total_price,
          productDiscount: res.discount,
          shippingFee: 3.5,
          shippingDiscount: 1.3,
          total: res.total_price,
          payProducts: [
            {
              name: 'Chair used to sit',
              brand: 'Calvin Klein',
              variation: '80cm',
              imgUrl:
                'https://image.architonic.com/img_pro2-4/100/2837/oswald_lang_06_b_sat.jpg',
              unitPrice: 5.2,
              quantity: 2,
              subTotal: 12.3,
            },
          ],
        })
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
