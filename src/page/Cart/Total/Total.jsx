import {Box, Button, Divider, Grid, Paper, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {setTotalPrice} from 'store/cartSlice'

const Total = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const newTotal = cartItems
      .reduce((pre, cur) => {
        return pre + cur.quantity * Number(cur.price)
      }, 0)
      ?.toFixed(2)

    setTotal(newTotal)
    dispatch(setTotalPrice(newTotal))
  }, [cartItems])
  return (
    <div>
      <Paper elevation={0} style={{padding: 10}}>
        <Typography variant="h5" component="h6" style={{textAlign: 'center'}}>
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
          <Grid item>${total}</Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item>Save</Grid>
          <Grid item>$0</Grid>
        </Grid>
        <Divider style={{padding: '10px 0'}} />
        <Grid container justifyContent="space-between">
          <Grid item style={{fontWeight: 600}}>
            Total
          </Grid>
          <Grid item style={{color: '#1264A9', fontWeight: 600}}>
            ${total}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Total
