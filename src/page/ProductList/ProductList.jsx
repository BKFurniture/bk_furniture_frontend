import {
  Box,
  Container,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import CardProduct from 'component/CardProduct'
import React, {useEffect, useState} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import productApi from 'api/product'

const TAB_VALUE = ['', '', 'price', '-price']
const ProductList = () => {
  const matches = useMediaQuery('(max-width:450px)')
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [tab, setTab] = useState(0)
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 10,
  })

  useEffect(() => {
    productApi.getList(filter).then((res) => {
      if (res.results) setData(res.results)
      else if (res.count) setTotal(res.count)
    })
  }, [filter])

  const handleChangePage = (event, value) => {
    setFilter({...filter, offset: value - 1})
  }
  const handleChangeTab = (event, value) => {
    setTab(value)
    setFilter({...filter, ordering: TAB_VALUE[value]})
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
                value={18}
                label="Category"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
              <InputLabel id="price">Price</InputLabel>
              <Select
                sx={{width: 100}}
                labelId="price"
                id="price"
                value={18}
                label="Price"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
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
          <Tab label="Popular" style={{textTransform: 'none'}} />
          <Tab label="Latest" style={{textTransform: 'none'}} />
          <Tab label="Price low to high" style={{textTransform: 'none'}} />
          <Tab label="Price high to low" style={{textTransform: 'none'}} />
        </Tabs>
      </Box>
      <Grid container style={{padding: '20px 0'}} spacing={2}>
        {data.map((item) => (
          <Grid lg={3} md={4} sm={6} xs={12} item>
            <CardProduct item={item} />
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="end">
        <Pagination
          count={total / filter.limit}
          page={filter.offset + 1}
          onChange={handleChangePage}
          variant="text"
          color="primary"
        />
      </Grid>
    </Container>
  )
}

export default ProductList
