import {
  Box,
  Container,
  Typography,
  Rating,
  Button,
  Grid,
} from '@mui/material'
import React, { useState } from 'react'
import CardDetails from 'component/CardDetails'
import { styled } from '@mui/material/styles';
import ChairImg from 'asset/img/chair.png'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

import IconButton from '@material-ui/core/IconButton';


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#1264A9',
  },
});

const product =
{
  id: 1,
  category: 'Sofa',
  name: 'Glossy Cube',
  description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  rating: 4.5,
  price: 1000000,
  src: ChairImg,
}

function QuantityButton() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div>
      <IconButton aria-label="remove" onClick={handleDecrement}>
        <IndeterminateCheckBoxIcon fontSize='large' style={{ color: '#1264a9' }} />
      </IconButton>
      <Typography variant="span" style={{ fontSize: '20px', color: '#1264a9' }}>
        <span>{quantity}</span>
      </Typography>
      <IconButton aria-label="add" onClick={handleIncrement}>
        <AddBoxIcon fontSize='large' style={{ color: '#1264a9' }} />
      </IconButton>
    </div>
  );
}

const Details = () => {

  return (
    <Container >
      <Typography
        variant="h5"
        component="h2"
        style={{ color: '#1264A9', fontWeight: 700 }}
      >
        Product detail
      </Typography>
      <Box margin='40px' padding={5} display='flex' style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 30 }}>
        <CardDetails></CardDetails>
        <div>
          <Typography variant="h3" component="h2" style={{ color: '#1264A9' }}>{(product.category).toUpperCase()}</Typography>
          <Box mb={1} />
          <Typography fontSize={30} variant="h3" component="h2" style={{ color: '#1264A9', fontWeight: 50 }}>Glossy Cube</Typography>
          <Box mb={0.5} />
          <StyledRating name="my-rating" value={product.rating} max={5} />
          <Box mb={1.5} />
          <Grid container>
            <Grid xs={5.5}>
              <Typography fontSize={24} variant="h6" component="h2" xs={5} style={{ color: '#1264A9' }}>Price:  </Typography>
            </Grid>
            <Grid>
              <Typography fontSize={24} variant="h6" component="h2" xs={5} style={{ color: '#1264A9' }}>{product.price.toLocaleString('en-US')} đ</Typography>
            </Grid>
          </Grid>
          <Box mb={0.5} />

          <Grid container alignItems='center'>
            <Grid xs={5} >
              <Typography fontSize={24} variant="h6" component="h2" style={{ color: '#1264A9' }}>Quantity:</Typography>
            </Grid>
            <Grid xs={5} alignItems='center'>
              <QuantityButton />
            </Grid>
          </Grid>

          <Typography fontSize={24} variant="h6" component="h2" style={{ color: '#1264A9' }}>Product description: </Typography>
          <Box mb={0.25} />
          <div>
            <Typography fontSize={16} width={350} variant="body1" wrap={true}>{product.description}</Typography>
          </div>
          <Box mb={2} />
          <Button fullWidth variant="contained" color='primary' height={100}  sx={{ borderRadius: '10px', height: '60px' }} endIcon={<ShoppingBagIcon />}>
            <Typography fontSize={18} variant="button" style={{ textTransform: 'none' }}>Add to Cart</Typography>
          </Button>
          <Box mb={1} />
          <Button fullWidth variant="outlined" height={100} style={{ borderColor: "primary", borderWidth: '3', backgroundColor: '#ffffff', borderRadius: '10px', height: '60px' }}>
            <Typography color="primary" fontSize={18} variant="button" style={{ textTransform: 'none' }}>Buy now</Typography>
          </Button>
        </div>
      </Box>
    </Container>

  )
}

export default Details