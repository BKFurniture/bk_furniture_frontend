import {
  Box,
  Container,
  Typography,
  Rating,
  Button,
  Grid,
  Avatar,
  Breadcrumbs,
  Link,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipeReviewCard from "component/CardDetails";
import { styled } from "@mui/material/styles";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import detailsApi from "api/details";
import RatingApi from "api/rating";
import { useDispatch } from "react-redux";
import { addCartItem } from "store/cartSlice";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const RatingBox = ({ rate, ratings }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
  };

  const ratingGroups = ratings.reduce((acc, cur) => {
    const { stars } = cur;
    acc[stars] = (acc[stars] || 0) + 1;
    return acc;
  }, {});

  const filteredRatings = selectedRating
    ? ratings.filter((rating) => rating.stars === selectedRating)
    : ratings;

  return (
    <Grid>
      <Box
        border={1}
        borderColor="#1264A9"
        padding={3}
        display="flex"
        style={{ backgroundColor: "#EDFFFF", borderRadius: 10 }}
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
                  sx={{ color: "#F5B000", fontSize: "36px" }}
                >
                  {typeof rate === "number"
                    ? parseFloat(rate.toFixed(1))
                    : rate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#F5B000",
                    fontSize: "24px",
                    lineHeight: "36px",
                    verticalAlign: "text-bottom",
                  }}
                >
                  {" "}
                  /{" "}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  sx={{ color: "#F5B000", fontSize: "36px" }}
                >
                  5
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justifyContent="center" alignItems="center">
              <Rating value={rate} precision={0.5} readOnly />
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
              spacing={2}
              justifyContent="center"
              alignItems="center"
              paddingBottom={0.5}
            >
              <Grid item>
                {" "}
                <Button
                  variant={selectedRating === null ? "contained" : "outlined"}
                  onClick={() => handleRatingFilter(null)}
                >
                  All
                </Button>
              </Grid>
              {[1, 2, 3, 4, 5].map((starValue) => (
                <Grid item>
                  {" "}
                  <Button
                    key={starValue}
                    variant={
                      selectedRating === starValue ? "contained" : "outlined"
                    }
                    onClick={() => handleRatingFilter(starValue)}
                  >
                    {starValue === 1 ? "1 star" : `${starValue} stars`} (
                    {ratingGroups[starValue] || 0})
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Grid>
        <Box sx={{ mt: 2 }}>
          {filteredRatings.map((rating) => (
            <Box sx={{ my: 8 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar
                  src={rating.user?.profile?.avatar}
                  alt={rating.user?.first_name + " " + rating.user?.last_name}
                  sx={{ mr: 2, width: 64, height: 64 }}
                />
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 0.5, fontSize: "18px", fontWeight: "bold" }}
                  >
                    {rating.user.first_name + " " + rating.user.last_name}
                  </Typography>
                  <Rating name="my-rating" value={rating.stars} readOnly />
                  <Box />
                  <Typography
                    variant="caption"
                    sx={{ mb: 1, fontSize: "14px" }}
                  >{`${new Date(rating.created_at).getFullYear()}-${(
                    new Date(rating.created_at).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${new Date(rating.created_at)
                    .getDate()
                    .toString()
                    .padStart(2, "0")} ${new Date(rating.created_at)
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${new Date(rating.created_at)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`}</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 1,
                      color: "grey.500",
                      fontSize: "18px",
                      fontStyle: "italic",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Variation:</span>{" "}
                    Something
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontSize: "18px" }}>
                    {rating.comment}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    {rating.images.map((image) => (
                      <img
                        src={image}
                        alt="Product review image"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain",
                          marginRight: "8px",
                        }}
                      />
                    ))}
                  </Box>
                  {/* <ThumbUpAltOutlinedIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  /> */}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#1264A9",
  },
});

function QuantityButton({ quantity, setQuantity }) {
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div>
      <IconButton aria-label="remove" onClick={handleDecrement}>
        <IndeterminateCheckBoxIcon
          fontSize="large"
          style={{ color: "#1264a9" }}
        />
      </IconButton>
      <Typography variant="span" style={{ fontSize: "20px", color: "#000000" }}>
        <span>{quantity}</span>
      </Typography>
      <IconButton aria-label="add" onClick={handleIncrement}>
        <AddBoxIcon fontSize="large" style={{ color: "#1264a9" }} />
      </IconButton>
    </div>
  );
}

function SizeSelector({ sizes }) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <Grid
      justifyContent="center"

    >
      <ToggleButtonGroup 
        value={selectedSize} 
        exclusive 
        onChange={handleChange} 
        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
      >
        {!sizes ||
          sizes.map((size) => (
            <Grid item key={size}>
              <ToggleButton 
                value={size} 
                style={{ 
                  whiteSpace: 'nowrap', 
                  borderWidth: '2px', 
                  borderColor: '#000000', 
                  color: '#000000', 
                  fontSize: '12px', 
                  height: '28x',
                  padding: '0 10px'
                }}
              >
                {size}
              </ToggleButton>
            </Grid>
          ))}
      </ToggleButtonGroup>
    </Grid>
  );
}

const Details = () => {
  const { name } = useParams();
  const [details, setDetails] = useState({});
  const [ratings, setRatings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [able, setAble] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await detailsApi.get(name);
        console.log(response)
        // console.log(response.slug)

        if (response.code === 404) {
          setAble(false);
        } else {
          setDetails(response);
          // console.log(details.slug)
        }
      } catch (error) {
        console.log("Failed to fetch details: ", error);
      }
    };
    fetchDetails();
  }, [name]);

  // useEffect(() => {
  //   if (!able) {
  //     navigate("/");
  //   }
  // }, [able, navigate]);

  useEffect(() => {
    if (details && details.slug) {
      const slg = details.slug;
      const fetchRatings = async () => {
        try {
          const response = await RatingApi.getBySlug(slg);
          if (response.code === 404) {
            setAble(false);
          } else {
            setRatings(response);
          }
        } catch (error) {
          console.log("Failed to fetch ratings: ", error);
        }
      };
      fetchRatings();
    }
  }, [details.slug]);

  const handleAddCard = (value) => () => {
    dispatch(addCartItem(value));
  };

  const colorBoxes = (details) => {
    if (!details.colors || !Array.isArray(details.colors)) {
      return null;
    }

    return details.colors.map((color) => {
      const [name, code] = color.split("#");
      return (
        <Box
          key={name}
          style={{
            backgroundColor: `#${code}`,
            borderRadius: 3,
            height: 35,
            width: 35,
            marginRight: 7,
            border: "2px solid #212427",
          }}
        ></Box>
      );
    });
  };

  function MyBreadcrumbs() {
    return (
      <Breadcrumbs
        marginLeft="40px"
        color="#1264A9"
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/products">
          Products
        </Link>
        <Typography color="text.primary">{details.name}</Typography>
      </Breadcrumbs>
    );
  }

  return (
    <Container>
      <MyBreadcrumbs />
      <Box
        margin="40px"
        padding={5}
        display="flex"
        style={{ backgroundColor: "#fff", borderRadius: 10, marginTop: 30 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {details.images &&
            details.images.map((image, index) => (
              <img
                src={image.url}
                alt={`img${index + 1}`}
                key={index}
                style={{ width: "100px", height: "auto", marginTop: "10px" }}
              />
            ))}
        </div>
        <RecipeReviewCard
          item={
            details.images && details.images.length > 0 && details.images[0].url
          }
        ></RecipeReviewCard>
        <div>
          <Typography variant="h3" component="h2" style={{ color: "#1264A9" }}>
            {details.category && details.category.toUpperCase()}
          </Typography>
          <Box mb={1} />
          <Typography
            fontSize={30}
            variant="h3"
            component="h2"
            style={{ color: "#1264A9", fontWeight: 50 }}
          >
            {details.name}
          </Typography>
          <Box mb={0.5} />
          <StyledRating
            name="my-rating"
            value={details.avg_rating ? details.avg_rating : 0}
            max={5}
            precision={0.5}
            readOnly
          />
          <Box mb={1.5} />
          <Grid container>
            <Grid xs={5.5}>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                xs={5}
                style={{ color: "#1264A9" }}
              >
                Price:{" "}
              </Typography>
            </Grid>
            <Grid>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                xs={5}
                style={{ color: "#1264A9" }}
              >
                $ {details.price}
              </Typography>
            </Grid>
          </Grid>
          <Box mb={0.5} />
          <Grid container alignItems="center">
            <Grid xs={5.5}>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                xs={5}
                style={{ color: "#1264A9" }}
              >
                Color:{" "}
              </Typography>
            </Grid>
            {colorBoxes(details)}
          </Grid>

          <Grid container alignItems="center">
            <Grid xs={5}>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                style={{ color: "#1264A9" }}
              >
                Quantity:
              </Typography>
            </Grid>
            <Grid xs={5} alignItems="center">
              <QuantityButton quantity={quantity} setQuantity={setQuantity} />
            </Grid>
          </Grid>
          <Box mb={0.5} />
          <Grid container alignItems="center">
            <Grid xs={5}>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                style={{ color: "#1264A9" }}
              >
                Size:
              </Typography>
            </Grid>
            <Grid xs={5} alignItems="center">
              <SizeSelector sizes={details.sizes} />
            </Grid>
          </Grid>
          <Box mb={0.5} />
          <Grid container alignItems="center">
            <Grid xs={5.5}>
              <Typography
                fontSize={24}
                variant="h6"
                component="h2"
                style={{ color: "#1264A9" }}
              >
                Origin:{" "}
              </Typography>
            </Grid>
            <Grid xs={5}>
              <Typography fontSize={24} variant="h3" component="h2">
                {details.origin}
              </Typography>
            </Grid>
          </Grid>
          <Box mb={1.5} />
          <Typography
            fontSize={24}
            variant="h6"
            component="h2"
            style={{ color: "#1264A9" }}
          >
            Product description:{" "}
          </Typography>
          <Box mb={0.25} />
          <div>
            <Typography
              fontSize={16}
              width={340}
              variant="body1"
              wrap={true}
              align="justify"
            >
              {details.description}
            </Typography>
          </div>
          <Box mb={2} />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            height={100}
            sx={{ borderRadius: "10px", height: "60px" }}
            endIcon={<ShoppingBagIcon />}
            onClick={handleAddCard({ ...details, quantity: quantity })}
          >
            <Typography
              fontSize={18}
              variant="button"
              style={{ textTransform: "none" }}
            >
              Add to Cart
            </Typography>
          </Button>
          <Box mb={1} />
        </div>
      </Box>
      <Box
        margin="40px"
        padding={5}
        display="flex"
        style={{ backgroundColor: "#fff", borderRadius: 10, marginTop: 30 }}
      >
        <Grid container>
          <Grid>
            <Typography
              variant="h5"
              component="h2"
              style={{ color: "#1264A9", fontWeight: 700 }}
            >
              Product rating
            </Typography>
            <Box mb={1.4} />
          </Grid>
          <Grid item xs={12}>
            <RatingBox
              rate={details.avg_rating ? details.avg_rating : 0}
              ratings={ratings}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Details;
