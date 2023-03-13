import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import {Avatar, Box, Grid, IconButton, Menu, MenuItem} from '@mui/material'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import LOGO from 'asset/img/logo.svg'
import SearchBar from 'component/SearchBar'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from 'store/userSlice'
const Header = () => {
  const isUser = !!useSelector((state) => state.user.accessToken)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    handleClose()
    dispatch(logout())
  }
  return (
    <>
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
                <img style={{height: 50}} alt="Remy Sharp" src={LOGO} />
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
                <div style={{marginRight: 10}}>
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
                        <MenuItem onClick={handleClose}>
                          Account setting
                        </MenuItem>
                        <MenuItem onClick={handleClose}>My order</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  )}
                </div>
                <div>
                  <Avatar
                    sx={{
                      height: 30,
                      width: 30,
                      backgroundColor: '#fff',
                      color: 'black',
                    }}
                  >
                    <ShoppingCartIcon />
                  </Avatar>
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
              <TabContext value={'1'}>
                <Box sx={{maxWidth: '100%'}}>
                  <TabList
                    style={{height: 60}}
                    onChange={() => {}}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab
                      label="HOME"
                      value="1"
                      icon={<HomeIcon />}
                      iconPosition="start"
                    />
                    <Tab
                      icon={<MenuIcon />}
                      label="CATEGORY"
                      iconPosition="start"
                      value="2"
                    />
                    <Tab label="LIVING ROOM" value="3" />
                    <Tab label="BED ROOM" value="3" />
                    <Tab label="CUSTOM DESIGN" value="3" />
                  </TabList>
                </Box>
              </TabContext>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Header
