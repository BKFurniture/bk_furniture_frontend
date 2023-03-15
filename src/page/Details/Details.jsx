import {
  Box,
  Container,
  Typography,
  Rating,
  Button,
  Grid,
  Avatar,
} from '@mui/material'
import React, {useState} from 'react'
import CardDetails from 'component/CardDetails'
import {styled} from '@mui/material/styles'
import ChairImg from 'asset/img/chair.png'
import ImageReview from 'asset/img/imgcmt.jpg'
import Avt from 'asset/img/avtcus.jpg'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import Img1 from 'asset/img/img1.jpg';
import Img2 from 'asset/img/img2.jpg';
import Img3 from 'asset/img/img3.jpg';

const productImage = { img1: Img1, img2: Img2, img3: Img3 };

const customer = {name: 'Lam Thanh Duong', avatar: Avt}

const productRatings = [
  {
    ctm: customer.name,
    id: 1,
    variation: 'Ebony, size 2 meters',
    rating: 1,
    date: new Date('2022-02-04T23:59:00Z'),
    imgSrc: ImageReview,
    imgSrc1: ImageReview,
    imgSrc2: ImageReview,
    comment: 'Terrible product',
  },
  {
    ctm: customer.name,
    id: 2,
    variation: 'Ebony, size 2 meters',
    rating: 2,
    date: new Date('2022-02-04T23:59:00Z'),
    imgSrc: ImageReview,
    imgSrc1: ImageReview,
    imgSrc2: ImageReview,
    comment: 'Not great, not terrible',
  },
  {
    ctm: customer.name,
    id: 3,
    variation: 'Ebony, size 2 meters',
    rating: 3,
    date: new Date('2022-02-04T23:59:00Z'),
    imgSrc: ImageReview,
    imgSrc1: ImageReview,
    imgSrc2: ImageReview,
    comment: 'Average product',
  },
  {
    ctm: customer.name,
    id: 4,
    variation: 'Ebony, size 2 meters',
    rating: 4,
    date: new Date('2022-02-04T23:59:00Z'),
    imgSrc: ImageReview,
    imgSrc1: ImageReview,
    imgSrc2: ImageReview,
    comment: 'Great product',
  },
  {
    ctm: customer.name,
    id: 5,
    variation: 'Ebony, size 2 meters',
    rating: 5,
    date: new Date('2022-02-04T23:59:00Z'),
    imgSrc: ImageReview,
    imgSrc1: ImageReview,
    imgSrc2: ImageReview,
    comment: 'Excellent product',
  },
]

const RatingBox = () => {
  const [selectedRating, setSelectedRating] = useState(null)

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating)
  }

  const ratingGroups = productRatings.reduce((acc, cur) => {
    const {rating} = cur
    acc[rating] = (acc[rating] || 0) + 1
    return acc
  }, {})

  const filteredRatings = selectedRating
    ? productRatings.filter((rating) => rating.rating === selectedRating)
    : productRatings

  const averageRating =
    productRatings.reduce((total, rating) => total + rating.rating, 0) /
    productRatings.length

  return (
    <Grid>
      <Box
        border={1}
        borderColor="#1264A9"
        padding={3}
        display="flex"
        style={{backgroundColor: '#EDFFFF', borderRadius: 10}}
      >
        <Grid container justifyContent="left" alignItems="center">
          <Grid xs={5}>
            <Grid
              container
              display="flex"
              justifyContent="center"
              alignItems="baseline"
            >
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{color: '#F5B000', fontSize: '36px'}}
                >
                  {averageRating}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#F5B000',
                    fontSize: '24px',
                    lineHeight: '36px',
                    verticalAlign: 'text-bottom',
                  }}
                >
                  {' '}
                  /{' '}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{color: '#F5B000', fontSize: '36px'}}
                >
                  5
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center" alignItems="center">
              <Rating value={averageRating} precision={0.5} readOnly />
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              paddingBottom={0.5}
            >
              <Button
                variant={selectedRating === null ? 'contained' : 'outlined'}
                onClick={() => handleRatingFilter(null)}
                sx={{px: 2, mx: 2}}
              >
                All
              </Button>
              {[1, 2, 3].map((rating) => (
                <Button
                  key={rating}
                  variant={selectedRating === rating ? 'contained' : 'outlined'}
                  onClick={() => handleRatingFilter(rating)}
                  sx={{px: 1.5, mx: 1}}
                >
                  {rating === 1 ? '1 star' : `${rating} stars`} (
                  {ratingGroups[rating] || 0})
                </Button>
              ))}
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              paddingTop={1.5}
            >
              {[4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={selectedRating === rating ? 'contained' : 'outlined'}
                  onClick={() => handleRatingFilter(rating)}
                  sx={{px: 2, mx: 2}}
                >
                  {rating === 1 ? '1 star' : `${rating} stars`} (
                  {ratingGroups[rating] || 0})
                </Button>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Grid>
        <Box sx={{mt: 2}}>
          {filteredRatings.map((rating) => (
            <Box key={rating.id} sx={{my: 12}}>
              <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                <Avatar
                  src={customer.avatar}
                  alt={customer.name}
                  sx={{mr: 2, width: 64, height: 64}}
                />
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{mb: 0.5, fontSize: '18px', fontWeight: 'bold'}}
                  >
                    {rating.ctm}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{mb: 1, fontSize: '14px'}}
                  >{`${rating.date.getFullYear()}-${(rating.date.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}-${rating.date
                    .getDate()
                    .toString()
                    .padStart(2, '0')} ${rating.date
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${rating.date
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`}</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      color: 'grey.500',
                      fontSize: '18px',
                      fontStyle: 'italic',
                    }}
                  >
                    <span style={{fontWeight: 'bold'}}>Variation:</span>{' '}
                    {rating.variation}
                  </Typography>
                  <Typography variant="body2" sx={{mb: 2, fontSize: '18px'}}>
                    {rating.comment}
                  </Typography>
                  <Box sx={{display: 'flex'}}>
                    <img
                      src={rating.imgSrc}
                      alt="Product review image"
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        marginRight: '8px',
                      }}
                    />
                    <img
                      src={rating.imgSrc1}
                      alt="Product review image"
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        marginRight: '8px',
                      }}
                    />
                    <img
                      src={rating.imgSrc2}
                      alt="Product review image"
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <ThumbUpAltOutlinedIcon
                    color="primary"
                    sx={{cursor: 'pointer'}}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> f2ee4b2930e4ca1d44ff4415baeb640925843505

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#1264A9',
  },
})

const product = {
  id: 1,
  category: 'Sofa',
  name: 'Glossy Cube',
  description:
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  rating: 3,
  price: 49.90,
  src: ChairImg,
  origin: 'Germany',
}

function QuantityButton() {
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  return (
    <div>
<<<<<<< HEAD
      <AddBoxIcon aria-label="remove" onClick={handleDecrement}>
        <IndeterminateCheckBoxIcon
          fontSize="large"
          style={{color: '#1264a9'}}
        />
      </AddBoxIcon>
      <Typography variant="span" style={{fontSize: '20px', color: '#1264a9'}}>
=======
      <IconButton aria-label="remove" onClick={handleDecrement}>
        <IndeterminateCheckBoxIcon fontSize='large' style={{ color: '#1264a9' }} />
      </IconButton>
      <Typography variant="span"  style={{ fontSize: '20px', color: '#000000' }}>
>>>>>>> f2ee4b2930e4ca1d44ff4415baeb640925843505
        <span>{quantity}</span>
      </Typography>
      <AddBoxIcon aria-label="add" onClick={handleIncrement}>
        <AddBoxIcon fontSize="large" style={{color: '#1264a9'}} />
      </AddBoxIcon>
    </div>
  )
}

const Details = () => {
  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
<<<<<<< HEAD
        style={{color: '#1264A9', fontWeight: 700}}
      >
        Product detail
      </Typography>
      <Box
        margin="40px"
        padding={5}
        display="flex"
        style={{backgroundColor: '#fff', borderRadius: 10, marginTop: 30}}
      >
=======
        style={{ color: '#1264A9', fontWeight: 700 }}
        margin='40px'
      >
        Product detail
      </Typography>
      <Box margin='40px' padding={5} display='flex' style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 30 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src={productImage.img1} alt="img1" style={{ width: '81px', height: '81px' }} />
          <img src={productImage.img2} alt="img2" style={{ width: '81px', height: '81px' }} />
          <img src={productImage.img3} alt="img3" style={{ width: '81px', height: '81px' }} />
        </div>
>>>>>>> f2ee4b2930e4ca1d44ff4415baeb640925843505
        <CardDetails></CardDetails>
        <div>
          <Typography variant="h3" component="h2" style={{color: '#1264A9'}}>
            {product.category.toUpperCase()}
          </Typography>
          <Box mb={1} />
          <Typography
            fontSize={30}
            variant="h3"
            component="h2"
            style={{color: '#1264A9', fontWeight: 50}}
          >
            Glossy Cube
          </Typography>
          <Box mb={0.5} />
          <StyledRating name="my-rating" value={product.rating} max={5} />
          <Box mb={1.5} />
          <Grid container>
            <Grid xs={5.5}>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                xs={5}
                style={{color: '#1264A9'}}
              >
                Price:{' '}
              </Typography>
            </Grid>
            <Grid>
<<<<<<< HEAD
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                xs={5}
                style={{color: '#1264A9'}}
              >
                {product.price.toLocaleString('en-US')} đ
              </Typography>
=======
              <Typography fontSize={24} variant="h6" component="h2" xs={5} style={{ color: '#1264A9' }}>$ {' '}{product.price}</Typography>
>>>>>>> f2ee4b2930e4ca1d44ff4415baeb640925843505
            </Grid>
          </Grid>
          <Box mb={0.5} />
          <Grid container alignItems='center'>
            <Grid xs={5.5}>
              <Typography fontSize={24} variant="h6" component="h2" xs={5} style={{ color: '#1264A9' }}>Color:  </Typography>
            </Grid>
            <Box style={{ backgroundColor: '#1264A9', borderRadius: 3, height: 35, width: 35, marginRight: 7, border: '2px solid #212427' }}></Box>
            <Box style={{ backgroundColor: '#999999', borderRadius: 3, height: 35, width: 35, marginRight: 7, border: '2px solid #212427' }}></Box>
            <Box style={{ backgroundColor: '#D8D8D8', borderRadius: 3, height: 35, width: 35, border: '2px solid #212427' }}></Box>
    
          </Grid>

          <Grid container alignItems="center">
            <Grid xs={5}>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                style={{color: '#1264A9'}}
              >
                Quantity:
              </Typography>
            </Grid>
            <Grid xs={5} alignItems="center">
              <QuantityButton />
            </Grid>
          </Grid>
          <Box mb={0.5} />
          <Grid container alignItems='center'>
              <Grid xs={5.5} >
              <Typography fontSize={24} variant="h6" component="h2" style={{ color: '#1264A9' }}>Origin: </Typography>
              </Grid>
              <Grid xs={5} >
              <Typography fontSize={24} variant="h3" component="h2">Germany </Typography>
              </Grid>

<<<<<<< HEAD
          <Typography
            fontSize={24}
            variant="h6"
            component="h2"
            style={{color: '#1264A9'}}
          >
            Product description:{' '}
          </Typography>
          <Box mb={0.25} />
          <div>
            <Typography fontSize={16} width={350} variant="body1" wrap={true}>
              {product.description}
            </Typography>
=======
          </Grid>
          <Box mb={1.5} />
          <Typography fontSize={24} variant="h6" component="h2" style={{ color: '#1264A9' }}>Product description: </Typography>
          <Box mb={0.25} />
          <div>
            <Typography fontSize={16} width={340} variant="body1" wrap={true} align='justify'>{product.description}</Typography>
>>>>>>> f2ee4b2930e4ca1d44ff4415baeb640925843505
          </div>
          <Box mb={2} />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            height={100}
            sx={{borderRadius: '10px', height: '60px'}}
            endIcon={<ShoppingBagIcon />}
          >
            <Typography
              fontSize={18}
              variant="button"
              style={{textTransform: 'none'}}
            >
              Add to Cart
            </Typography>
          </Button>
          <Box mb={1} />
          <Button
            fullWidth
            variant="outlined"
            height={100}
            style={{
              borderColor: 'primary',
              borderWidth: '3',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              height: '60px',
            }}
          >
            <Typography
              color="primary"
              fontSize={18}
              variant="button"
              style={{textTransform: 'none'}}
            >
              Buy now
            </Typography>
          </Button>
        </div>
      </Box>
      <Box
        margin="40px"
        padding={5}
        display="flex"
        style={{backgroundColor: '#fff', borderRadius: 10, marginTop: 30}}
      >
        <Grid container>
          <Grid>
<<<<<<< HEAD
            <Typography
              variant="h5"
              component="h2"
              style={{color: '#1264A9', fontWeight: 700}}
            >
              Product detail
=======
            <Typography variant="h5" component="h2" style={{ color: '#1264A9', fontWeight: 700 }}>
              Product rating
>>>>>>> f2ee4b2930e4ca1d44ff4415baeb640925843505
            </Typography>
            <Box mb={1.4} />
          </Grid>
          <Grid item xs={12}>
            <RatingBox />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Details
