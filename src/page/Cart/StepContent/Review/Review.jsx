import {Divider, Grid, Paper, Typography} from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import CartItem from 'component/CartItem'
import {useSelector} from 'react-redux'
const Review = () => {
  const cartItems = useSelector((state) => state.app.cartItems)
  return (
    <div>
      <Paper elevation={0} style={{padding: 10}}>
        <Grid container>
          <Grid xs={12} sm={6} item style={{fontWeight: 600}}>
            Products
          </Grid>
          <Grid
            display={{xs: 'none', sm: 'block'}}
            sm={1}
            item
            style={{fontWeight: 600, textAlign: 'center'}}
          >
            Price
          </Grid>
          <Grid
            display={{xs: 'none', sm: 'block'}}
            sm={3}
            item
            style={{fontWeight: 600, textAlign: 'center'}}
          >
            Quantity
          </Grid>
          <Grid
            sm={1}
            display={{xs: 'none', sm: 'block'}}
            item
            style={{fontWeight: 600, textAlign: 'center'}}
          >
            Total
          </Grid>
          <Grid
            sm={1}
            display={{xs: 'none', sm: 'block'}}
            item
            style={{fontWeight: 600, textAlign: 'center'}}
          >
            <DeleteIcon />
          </Grid>
        </Grid>
        <Divider />
        {cartItems.map((item) => (
          <div style={{marginTop: 10}}>
            <CartItem item={item} />
          </div>
        ))}
      </Paper>
    </div>
  )
}

export default Review
