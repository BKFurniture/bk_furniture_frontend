import {Container, Grid, TextField, Typography} from '@mui/material'
import React from 'react'
import AddIcCallIcon from '@mui/icons-material/AddIcCall'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
const Footer = () => {
  return (
    <Container fixed style={{backgroundColor: '#fff', height: '100%'}}>
      <Grid container>
        <Grid xs={12} md={6} style={{padding: 10}}>
          <Typography variant="h6" component="h2" style={{color: '#1264A9'}}>
            CONTACT US
          </Typography>
          <div>
            <AddIcCallIcon style={{fontSize: '1.2rem', paddingRight: 5}} />{' '}
            0123456789
          </div>
          <Grid
            container
            direction="row"
            alignContent="center"
            alignItems="center"
          >
            <Grid>
              <MailOutlineIcon style={{fontSize: '1.4rem', paddingRight: 5}} />{' '}
            </Grid>
            <Grid>bkfurniture@gmail.com</Grid>
          </Grid>{' '}
        </Grid>

        <Grid xs={12} md={6} style={{padding: 10}}>
          <Typography variant="h6" component="h2" style={{color: '#1264A9'}}>
            FILL EMAIL FOR DEALS OR YOUR DESIGN
          </Typography>
          <div>
            <TextField
              size="small"
              style={{height: 20, width: 300}}
              id="outlined-password-input"
              label="Email Address"
              autoComplete="current-password"
            />
          </div>
        </Grid>
        <Grid xs={12} md={6} style={{padding: 10}}>
          <Typography variant="h6" component="h2" style={{color: '#1264A9'}}>
            VISIT OUR STORE
          </Typography>
          <div>
            <AddLocationAltIcon style={{fontSize: '1.2rem', paddingRight: 5}} />{' '}
            0123456789
          </div>
          <Grid
            container
            direction="row"
            alignContent="center"
            alignItems="center"
          >
            <Grid>
              <AccessTimeIcon style={{fontSize: '1.4rem', paddingRight: 5}} />{' '}
            </Grid>
            <Grid>bkfurniture@gmail.com</Grid>
          </Grid>{' '}
        </Grid>
        <Grid xs={12} md={6} style={{padding: 10}}>
          <Typography variant="h6" component="h2" style={{color: '#1264A9'}}>
            CONNECT WITH US
          </Typography>
          <div>
            <FacebookIcon style={{fontSize: '2rem'}} />
            <InstagramIcon style={{fontSize: '2rem'}} />
            <TwitterIcon style={{fontSize: '2rem'}} />
          </div>{' '}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer
