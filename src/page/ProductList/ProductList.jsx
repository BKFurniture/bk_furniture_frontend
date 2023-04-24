import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Popover,
  Select,
  Skeleton,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import CardProduct from 'component/CardProduct'
import React, {useEffect, useState} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import productApi from 'api/product'
const marks = [
  {
    value: 0,
    label: '$0',
  },

  {
    value: 1000,
    label: '1000$',
  },
  {
    value: 10000,
    label: '10 000$',
  },
]
const TAB_VALUE = ['price', '-price']
const ProductList = () => {
  const matches = useMediaQuery('(max-width:450px)')
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [priceRange, setPriceRange] = React.useState([0, 10000])
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 12,
    ordering: 'price',
  })
  const [anchorEl, setAnchorEl] = React.useState(null)
  useEffect(() => {
    productApi.getCategories({}).then((res) => {
      setCategories(res)
    })
  }, [])
  useEffect(() => {
    setLoading(true)

    productApi.getList(filter).then((res) => {
      setLoading(false)
      if (res.results) setData(res.results)
      if (res.count) setTotal(res.count)
    })
  }, [filter])

  const handleChangePriceRange = (event, newValue, activeThumb) => {
    const minDistance = 10
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setPriceRange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ])
    } else {
      setPriceRange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ])
    }
  }
  const handleClickPrice = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleChangePage = (event, value) => {
    setFilter({...filter, offset: (Number(value) - 1) * filter.limit})
  }
  const handleChangeTab = (event, value) => {
    setTab(value)
    setFilter({...filter, ordering: TAB_VALUE[value]})
  }
  const handleChangeCategory = (event) => {
    setFilter({...filter, category_slug: event.target.value})
  }
  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        style={{color: '#1264A9', fontWeight: 700}}
      >
        Products
      </Typography>
      <FormGroup row>
        <Grid
          container
          style={{fontWeight: '600', marginTop: 30}}
          spacing={2}
          alignItems="center"
        >
          <Grid item>Filter</Grid>
          <Grid item>
            <FormControl size="small">
              <InputLabel id="category">Category</InputLabel>
              <Select
                sx={{width: 100}}
                labelId="category"
                id="category"
                value={filter?.category_slug || null}
                onChange={handleChangeCategory}
                label="Category"
              >
                {categories.map &&
                  categories.map((item) => (
                    <MenuItem value={item.slug}>{item.title}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small">
              <InputLabel id="brand">Brand</InputLabel>
              <Select
                sx={{width: 100}}
                labelId="brand"
                id="brand"
                value={18}
                label="Brand"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small">
              <div>
                <TextField
                  aria-describedby={'price-range'}
                  label="Price"
                  variant="outlined"
                  size="small"
                  onClick={handleClickPrice}
                  value={`${priceRange[0]}$-${priceRange[1]}$`}
                />
                {/* <Button
                  aria-describedby={'price-range'}
                  variant="outlined"
                  onClick={() => {}}
                >
                  <div>Choose Price</div>
                </Button> */}
                <Popover
                  id={'price-range'}
                  open={!!anchorEl}
                  anchorEl={anchorEl}
                  onClose={() => {
                    setAnchorEl(null)
                    setFilter({
                      ...filter,
                      price: `${priceRange[0]}-${priceRange[1]}`,
                    })
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={priceRange}
                    onChange={handleChangePriceRange}
                    valueLabelDisplay="auto"
                    getAriaValueText={(value) => {
                      return `${value}°C`
                    }}
                    min={0}
                    step={1}
                    max={10000}
                    marks={marks}
                    style={{
                      width: 300,
                      margin: '20px 30px',
                      padding: '40px 10px 10px 10px',
                    }}
                  />
                </Popover>
              </div>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small">
              <InputLabel id="rating">Rating</InputLabel>
              <Select
                sx={{width: 100}}
                labelId="rating"
                id="rating"
                value={18}
                label="Rating"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </FormGroup>

      <Box sx={{marginTop: 5, maxWidth: matches ? 450 : '100%'}}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
        >
          {/* <Tab label="Popular" style={{textTransform: 'none'}} />
          <Tab label="Latest" style={{textTransform: 'none'}} /> */}
          <Tab label="Price low to high" style={{textTransform: 'none'}} />
          <Tab label="Price high to low" style={{textTransform: 'none'}} />
        </Tabs>
      </Box>

      <Grid container style={{padding: '20px 0'}} spacing={2}>
        {(loading ? Array.from(new Array(4)) : data).map((item) => (
          <Grid lg={3} md={4} sm={6} xs={12} item>
            <CardProduct item={item} />
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="end">
        <Pagination
          count={Math.ceil(total / filter.limit)}
          page={filter.offset / filter.limit + 1}
          onChange={handleChangePage}
          variant="text"
          color="primary"
        />
      </Grid>
    </Container>
  )
}

export default ProductList
