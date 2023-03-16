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

const STEPS = [
  'Review cart',
  'Shipping address',
  'Shipping option',
  'Proceed payment',
]
const Cart = () => {
  const [step, setStep] = useState(0)
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
      <Grid container style={{marginTop: 50}} spacing={1}>
        <Grid item xs={12} md={9}>
          <StepContent step={step} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={0} style={{padding: 10}}>
            <Typography
              variant="h5"
              component="h6"
              style={{textAlign: 'center'}}
            >
              Vouchers
            </Typography>
            <Box
              style={{
                width: '100%',
                border: '1px solid #1264A9',
                backgroundColor: '#E0F9FF',
                height: '36px',
                marginTop: 5,
              }}
            >
              <Button>Logo | Content</Button>
            </Box>
            <Box
              style={{
                width: '100%',
                border: '1px solid #1264A9',
                backgroundColor: '#E0F9FF',
                height: '36px',
                marginTop: 5,
              }}
            >
              <Button>Logo | Content</Button>
            </Box>
            <Divider style={{padding: '10px 0'}} />
            <div style={{textAlign: 'center', width: '100%'}}>
              <Link to="">Choose another voucher</Link>
            </div>
          </Paper>
          <Paper elevation={0} style={{padding: 10, marginTop: 20}}>
            <Grid container justifyContent="space-between">
              <Grid item>Subtotal</Grid>
              <Grid item>$250</Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>Save</Grid>
              <Grid item>$2</Grid>
            </Grid>
            <Divider style={{padding: '10px 0'}} />
            <Grid container justifyContent="space-between">
              <Grid item style={{fontWeight: 600}}>
                Total
              </Grid>
              <Grid item style={{color: '#1264A9', fontWeight: 600}}>
                $248
              </Grid>
            </Grid>
          </Paper>
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

        {step < 3 && (
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
      </Grid>
    </Container>
  )
}

export default Cart
