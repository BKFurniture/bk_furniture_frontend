import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {setDiscountCode, setTotalPrice} from 'store/cartSlice'
import ordersApi from 'api/order'

const Total = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const {discount} = useSelector((state) => state.cart)
  const [total, setTotal] = useState(0)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  useEffect(() => {
    const newTotal = cartItems
      .reduce((pre, cur) => {
        return pre + cur.quantity * Number(cur.price)
      }, 0)
      ?.toFixed(2)

    setTotal(newTotal)
    dispatch(setTotalPrice(newTotal))
  }, [cartItems])

  const handleChangeCode = (event) => {
    setCode(event.target.value)
  }
  const handleApplyCode = () => {
    ordersApi.checkCode(code).then((res) => {
      if (res.usage_limit > 0) {
        dispatch(setDiscountCode({code, percent: res.discount_percentage}))
        setError(false)
      } else {
        setError(true)
        dispatch(setDiscountCode({}))
      }
    })
  }
  return (
    <div>
      <Paper elevation={0} style={{padding: 10}}>
        <Typography variant="h5" component="h6" style={{textAlign: 'center'}}>
          Vouchers
        </Typography>

        <FormControl error variant="standard">
          <TextField
            id="outlined-basic"
            label="code"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleChangeCode}
            value={code}
          />
          {error && (
            <FormHelperText id="component-error-text">
              Code invalid
            </FormHelperText>
          )}
        </FormControl>
        <Divider style={{padding: '10px 0'}} />
        <div style={{textAlign: 'center', width: '100%', paddingTop: 10}}>
          <Button variant="contained" size="small" onClick={handleApplyCode}>
            Apply
          </Button>
        </div>
      </Paper>
      <Paper elevation={0} style={{padding: 10, marginTop: 20}}>
        <Grid container justifyContent="space-between">
          <Grid item>Subtotal</Grid>
          <Grid item>${total}</Grid>
        </Grid>
        {discount?.percent && (
          <Grid container justifyContent="space-between">
            <Grid item>Discount</Grid>
            <Grid item>{discount.percent}%</Grid>
          </Grid>
        )}

        <Grid container justifyContent="space-between">
          <Grid item>Save</Grid>
          <Grid item>
            ${(((discount?.percent || 0) * total) / 100).toFixed(2)}
          </Grid>
        </Grid>
        <Divider style={{padding: '10px 0'}} />
        <Grid container justifyContent="space-between">
          <Grid item style={{fontWeight: 600}}>
            Total
          </Grid>
          <Grid item style={{color: '#1264A9', fontWeight: 600}}>
            ${(((100 - (discount?.percent || 0)) * total) / 100).toFixed(2)}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Total
