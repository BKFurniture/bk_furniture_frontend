import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import LOGO from 'asset/img/logo.svg'
import SearchBar from 'component/SearchBar'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from 'store/userSlice'
import userApi from 'api/user'
import {getRefreshToken} from 'helpers'

const MENU_LINK = ['/', '/', '/products', '/', '/']
const Header = () => {
  const isUser = !!useSelector((state) => state.user.accessToken)
  const countCart = useSelector((state) => state.app.cartItems.length)
  const refreshToken = useSelector((state) => state.user.refreshToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [tab, setTab] = useState(0)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    handleClose()
    userApi.logout(refreshToken).then(() => {
      dispatch(logout())
    })
  }
  const handelChangeTab = (event, value) => {
    navigate(MENU_LINK[value])
    setTab(value)
  }
  return (
    <div
      style={{
        backgroundColor: '#fff',
        height: 150,
      }}
    >
      <Container
        style={{
          backgroundColor: '#fff',
          height: 150,
          boxShadow: '0px 15px 10px -15px #111',
        }}
      >
        <Box style={{padding: '10px 0'}}>
          <Grid container spacing={2}>
            <Grid item container style={{height: 60}}>
              <Grid item xs={4}>
                <Link to="/">
                  <img style={{height: 50}} alt="Remy Sharp" src={LOGO} />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
                container
                alignItems="center"
                justifyContent="flex-end"
              >
                <Box
                  component="div"
                  sx={{
                    marginRight: 3,
                    display: {xs: 'none', sm: 'block'},
                  }}
                >
                  <SearchBar />
                </Box>
                <div>
                  {!isUser ? (
                    <Link to="./sign-in">Login</Link>
                  ) : (
                    <div>
                      <IconButton
                        size="small"
                        aria-describedby="menu-user"
                        onClick={handleClick}
                        sx={{borderRadius: 50}}
                      >
                        <AccountCircleIcon sx={{height: 30, width: 30}} />
                      </IconButton>
                      <Menu
                        id="menu-user"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem
                          onClick={handleClose}
                          component={Link}
                          to="/account"
                        >
                          Account setting
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate('/orders')
                            handleClose()
                          }}
                        >
                          My order
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  )}
                </div>
                <div>
                  <IconButton
                    sx={{
                      backgroundColor: '#fff',
                      color: 'black',
                    }}
                    onClick={() => {
                      navigate('/cart')
                    }}
                  >
                    <Badge badgeContent={countCart} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </div>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              style={{height: 40}}
            >
              <TabContext value={tab}>
                <Box sx={{maxWidth: '100%'}}>
                  <TabList
                    style={{height: 60}}
                    onChange={handelChangeTab}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab
                      label="HOME"
                      value="0"
                      icon={<HomeIcon />}
                      iconPosition="start"
                    />
                    <Tab
                      icon={<MenuIcon />}
                      label="CATEGORY"
                      iconPosition="start"
                      value="1"
                    />
                    <Tab label="PRODUCTS" value="2" />
                    <Tab label="LIVING ROOM" value="3" />
                    <Tab label="BED ROOM" value="4" />
                    <Tab label="CUSTOM DESIGN" value="5" />
                  </TabList>
                </Box>
              </TabContext>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Header
