import {CardMedia, Grid, IconButton, styled, Typography} from '@mui/material'
import React from 'react'
import LOGO from 'asset/img/img1.jpg'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {useDispatch} from 'react-redux'
import {setQuantityCartItem} from 'store/cartSlice'
import {Link} from 'react-router-dom'
const StyledIconButton = styled(IconButton)(({theme, variant, color}) => {
  const overrides = {}

  const colorAsVariant =
    color === undefined || color === 'inherit' || color === 'default'
      ? 'primary'
      : color

  if (variant === 'contained') {
    overrides.backgroundColor = theme.palette[colorAsVariant].main
    overrides.color = theme.palette[colorAsVariant].contrastText
    overrides[':hover'] = {
      backgroundColor: theme.palette[colorAsVariant].dark,
    }
  }

  if (variant === 'outlined') {
    overrides.border = `1px solid ${theme.palette[colorAsVariant].main}`
    overrides.color = theme.palette[colorAsVariant].main
  }

  return {
    ...overrides,
  }
})

const CartItem = ({item}) => {
  const dispatch = useDispatch()
  const renderQuantity = () => (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <StyledIconButton
          onClick={() => {
            dispatch(
              setQuantityCartItem({id: item.id, quantity: item.quantity - 1}),
            )
          }}
          variant="contained"
          style={{width: 24, height: 24}}
        >
          <RemoveIcon />
        </StyledIconButton>
      </Grid>
      <Grid item style={{padding: '0 5px'}}>
        {item.quantity}
      </Grid>
      <Grid item>
        <StyledIconButton
          onClick={() => {
            dispatch(
              setQuantityCartItem({id: item.id, quantity: item.quantity + 1}),
            )
          }}
          variant="contained"
          style={{width: 24, height: 24}}
        >
          <AddIcon />
        </StyledIconButton>
      </Grid>
    </Grid>
  )
  return (
    <div>
      <Grid container alignItems="center">
        <Grid xs={12} sm={6} item>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <CardMedia
                component="img"
                sx={{width: 120, height: 100, padding: '0 15px'}}
                image={item?.images[0]?.url || LOGO}
              />
            </Grid>
            <Grid item xs={8}>
              <div style={{fontWeight: 600}}>
                <Link
                  to={`/details/${item.slug}`}
                  style={{textDecoration: 'none', color: '#1264A9'}}
                >
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              </div>
              <div> {item.category}</div>
              <div> {item.origin}</div>
              <Grid
                container
                justifyContent="space-between"
                sx={{display: {sm: 'none'}}}
              >
                <Grid item>
                  <Typography
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item style={{paddingRight: 20}}>
                  {renderQuantity()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{display: {xs: 'none', sm: 'block'}, textAlign: 'center'}}
          sm={1}
          item
        >
          $ {item.price}
        </Grid>
        <Grid
          sm={3}
          item
          sx={{display: {xs: 'none', sm: 'block'}, textAlign: 'center'}}
        >
          {renderQuantity()}
        </Grid>
        <Grid
          sm={1}
          sx={{display: {xs: 'none', sm: 'block'}, textAlign: 'center'}}
        >
          <Typography
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Grid>
        <Grid
          sm={1}
          item
          sx={{display: {xs: 'none', sm: 'block'}, textAlign: 'center'}}
        >
          <IconButton
            onClick={() => {
              dispatch(setQuantityCartItem({id: item.id, quantity: 0}))
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}

export default CartItem
