import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import LOGO from 'asset/img/logo.svg'
const Account = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    for (const pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`)
    }
  }
  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        style={{color: '#1264A9', fontWeight: 700}}
      >
        Account setting
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
        <Grid container justifyContent="center">
          <Grid item lg={6} md={8} sx={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              style={{marginBottom: 30}}
            >
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
                  <Avatar
                    alt="Remy Sharp"
                    src={LOGO}
                    sx={{width: 200, height: 200}}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={4} sx={{color: '#1264A9'}}>
                <IconButton disabled component="label">
                  <DriveFileRenameOutlineIcon sx={{color: '#1264A9'}} />
                </IconButton>

                <span>Email</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <IconButton disabled component="label">
                  <DriveFileRenameOutlineIcon sx={{color: '#1264A9'}} />
                </IconButton>

                <span>Email</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  size="small"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>

            <Grid style={{marginTop: 50}}>
              <Button type="submit" color="success" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Account
