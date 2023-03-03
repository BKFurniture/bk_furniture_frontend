import {Avatar, Box, Grid} from '@mui/material'
import Container from '@mui/material/Container'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LOGO from 'asset/img/logo.svg'
import SearchBar from 'component/SearchBar'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
const Header = () => {
  return (
    <>
      <Container fixed style={{backgroundColor: '#fff', height: 150}}>
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
                <div style={{marginRight: 30}}>
                  <SearchBar />
                </div>
                <div style={{marginRight: 10}}>
                  <Avatar src={LOGO} sx={{height: 30, width: 30}} />
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
                <Box>
                  <TabList
                    style={{height: 60}}
                    onChange={() => {}}
                    aria-label="lab API tabs example"
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
