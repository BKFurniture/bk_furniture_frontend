import {
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Rating,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import CreateIcon from '@mui/icons-material/Create'
import OrderApi from 'api/order'
import RatingApi from 'api/rating'
const OrderDetail = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const [openDialog, setOpenDialog] = useState(false)
  const [itemRating, setItemRating] = useState(null)
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({})
  let {id} = useParams()
  useEffect(() => {
    setLoading(true)
    OrderApi.getById(id).then((res) => {
      console.log(res, 'okene')
      setData(res)
      console.log(res.order_items)
      setLoading(false)
    })
  }, [id])
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const renderItems = (orderItems) => {
    const item = orderItems.product
    const {id, rating} = orderItems

    return (
      <Grid container alignItems="center">
        <Grid xs={6} item>
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
                  to={`/products/${item.slug}`}
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
              <div style={{margin: '5px 0'}}>
                {' '}
                Variation: {item.colors[0]}, {item.sizes[0]}
              </div>
              <div>
                <Button
                  variant="outlined"
                  startIcon={<CreateIcon />}
                  size="small"
                  disabled={!!rating}
                  onClick={() => {
                    setOpenDialog(true)
                    setItemRating({...item, id, rating})
                  }}
                >
                  Write review
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{textAlign: 'center'}} xs={2} item>
          $ {item.price}
        </Grid>
        <Grid xs={2} sx={{textAlign: 'center'}}>
          {orderItems.quantity}
        </Grid>
        <Grid xs={2} sx={{textAlign: 'center'}}>
          <Typography
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            ${`${orderItems.sub_total}`}
          </Typography>
        </Grid>
      </Grid>
    )
  }
  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        style={{color: '#1264A9', fontWeight: 700, marginBottom: 20}}
      >
        Order Detail
      </Typography>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {' '}
          <Grid container style={{marginBottom: 20}} spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} style={{padding: 10, height: '100%'}}>
                <div>Name: {data.recipient_name}</div>
                <div style={{marginTop: 5}}>Address: {data.address}</div>
                <div style={{marginTop: 5}}> Phone number: {data.mobile}</div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} style={{padding: 10, height: '100%'}}>
                <div>Order date: {data.order_date}</div>
                <div style={{marginTop: 5}}>
                  Payment method: {data.payment_method}
                </div>
                <div style={{marginTop: 5}}> Status: {data.status}</div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} style={{padding: 10, height: '100%'}}>
                <div>Shipping option: Standard</div>
                <div style={{marginTop: 5}}>
                  Expected delivery date: {data.expected_delivery_date}
                </div>
                <div style={{marginTop: 5}}>
                  {' '}
                  Delivery date: {data.delivery_date}
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Paper elevation={0} style={{padding: 10}}>
            <Grid container>
              <Grid xs={6} item style={{fontWeight: 600}}>
                Products
              </Grid>
              <Grid xs={2} item style={{fontWeight: 600, textAlign: 'center'}}>
                Price
              </Grid>
              <Grid xs={2} item style={{fontWeight: 600, textAlign: 'center'}}>
                Quantity
              </Grid>
              <Grid xs={2} item style={{fontWeight: 600, textAlign: 'center'}}>
                Total
              </Grid>
            </Grid>
            <Divider />
            {data &&
              data.order_items &&
              data.order_items.map((item) => (
                <div style={{marginTop: 10}}>{renderItems(item)}</div>
              ))}
            <Divider style={{margin: '10px 0'}} />
            <Grid container justifyContent="end">
              <Grid xs={12} sm={6}>
                <Grid container justifyContent={'space-between'} spacing={1}>
                  <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                    Sub Total
                  </Grid>
                  <Grid item>${data.total_price}</Grid>
                </Grid>
                {/* <Grid container justifyContent={'space-between'} spacing={1}>
                <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                  Product discount
                </Grid>
                <Grid item>$ 299.40</Grid>
              </Grid> */}
                {/* <Grid container justifyContent={'space-between'} spacing={1}>
                <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                  Shipping fee
                </Grid>
                <Grid item>$ 299.40</Grid>
              </Grid> */}
                <Grid container justifyContent={'space-between'} spacing={1}>
                  <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                    Shipping discount
                  </Grid>
                  <Grid item>$ {data.discount}</Grid>
                </Grid>
                <Grid container justifyContent={'space-between'} spacing={1}>
                  <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                    Total
                  </Grid>
                  <Grid
                    item
                    style={{color: '#D02828', fontWeight: 500, fontSize: 24}}
                  >
                    $ {data.total_price}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>RATING PRODUCT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  sx={{width: 120, height: 100, padding: '0 15px'}}
                  image={itemRating?.images[0]?.url}
                />
              </Grid>
              <Grid item xs={8}>
                <div style={{fontWeight: 600}}>
                  <Link
                    to={`/details/ `}
                    style={{textDecoration: 'none', color: '#1264A9'}}
                  >
                    <Typography>[T2022-000001] {itemRating?.name}</Typography>
                  </Link>
                </div>
                <div style={{margin: '5px 0'}}>
                  {' '}
                  Variation: {itemRating?.colors[0]}, {itemRating?.sizes[0]}
                </div>
              </Grid>
            </Grid>
          </DialogContentText>
          <Grid container justifyContent={'center'}>
            <Rating
              name="simple-controlled"
              value={itemRating?.rating || 5}
              onChange={(event, newValue) => {
                setItemRating({...itemRating, rating: newValue})
              }}
              style={{margin: '20px 0'}}
            />
          </Grid>
          <TextareaAutosize
            style={{width: '100%', height: 100}}
            onChange={(event) => {
              setItemRating({...itemRating, comment: event.target.value})
            }}
          />
          <Button
            variant="outlined"
            startIcon={<PhotoCamera />}
            style={{margin: '10px 0'}}
          >
            Add image
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <div>(Max is 6 images. The maximum size of each image is 50kB)</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleCloseDialog()
              RatingApi.create({
                stars: itemRating.rating || 5,
                comment: itemRating.comment,
                order_item_id: itemRating.id,
              }).then((res) => {
                let newData = {...data}
                newData.order_items = newData?.order_items?.map((item) => {
                  if (item.id == itemRating.id) {
                    const newItem = {...item, rating: res}
                    return newItem
                  } else return item
                })

                setData({...newData})
              })
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default OrderDetail
