import {
  Button,
  CardMedia,
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
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import CreateIcon from '@mui/icons-material/Create'
const OrderDetail = () => {
  const cartItems = useSelector((state) => state.app.cartItems)
  const [openDialog, setOpenDialog] = useState(true)
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const renderItems = (item) => (
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
            <div style={{margin: '5px 0'}}> Variation: Red, 80cm</div>
            <div>
              <Button
                variant="outlined"
                startIcon={<CreateIcon />}
                size="small"
                onClick={() => {
                  setOpenDialog(true)
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
        {item.quantity}
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
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  )
  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        style={{color: '#1264A9', fontWeight: 700, marginBottom: 20}}
      >
        Order Detail
      </Typography>
      <Grid container style={{marginBottom: 20}} spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} style={{padding: 10, height: '100%'}}>
            <div>Name: Nguyễn Văn A</div>
            <div style={{marginTop: 5}}>
              Address: KTX ĐHQG khu A, khu phố 6, P. Linh Trung, Tp. Thủ Đức,
              Tp. Hồ Chí Minh
            </div>
            <div style={{marginTop: 5}}> Phone number: 0987654321</div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} style={{padding: 10, height: '100%'}}>
            <div>Order date: 31/12/2020</div>
            <div style={{marginTop: 5}}>Payment method: MOMO</div>
            <div style={{marginTop: 5}}> Status: Success</div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} style={{padding: 10, height: '100%'}}>
            <div>Shipping option: Standard</div>
            <div style={{marginTop: 5}}>Expected delivery date: 01/01/2021</div>
            <div style={{marginTop: 5}}> Delivery date: 03/01/2021</div>
            <div style={{marginTop: 5}}>Status: Delivered</div>
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
        {cartItems.map((item) => (
          <div style={{marginTop: 10}}>{renderItems(item)}</div>
        ))}
        <Divider style={{margin: '10px 0'}} />
        <Grid container justifyContent="end">
          <Grid xs={12} sm={6}>
            <Grid container justifyContent={'space-between'} spacing={1}>
              <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                Sub Total
              </Grid>
              <Grid item>$ 299.40</Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} spacing={1}>
              <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                Product discount
              </Grid>
              <Grid item>$ 299.40</Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} spacing={1}>
              <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                Shipping fee
              </Grid>
              <Grid item>$ 299.40</Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} spacing={1}>
              <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                Shipping discount
              </Grid>
              <Grid item>$ 299.40</Grid>
            </Grid>
            <Grid container justifyContent={'space-between'} spacing={1}>
              <Grid item style={{color: '#1264A9', fontWeight: 500}}>
                Total
              </Grid>
              <Grid
                item
                style={{color: '#D02828', fontWeight: 500, fontSize: 24}}
              >
                $ 299.40
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>RATING PRODUCT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  sx={{width: 120, height: 100, padding: '0 15px'}}
                  image={'LOGO'}
                />
              </Grid>
              <Grid item xs={8}>
                <div style={{fontWeight: 600}}>
                  <Link
                    to={`/details/ `}
                    style={{textDecoration: 'none', color: '#1264A9'}}
                  >
                    <Typography>[T2022-000001] IKEA - Vintage table</Typography>
                  </Link>
                </div>
                <div style={{margin: '5px 0'}}> Variation: Red, 80cm</div>
              </Grid>
            </Grid>
          </DialogContentText>
          <Grid container justifyContent={'center'}>
            <Rating
              name="simple-controlled"
              value={3}
              onChange={(event, newValue) => {
                // setValue(newValue);
              }}
              style={{margin: '20px 0'}}
            />
          </Grid>
          <TextareaAutosize style={{width: '100%', height: 100}} />
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
          <Button onClick={handleCloseDialog}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default OrderDetail
