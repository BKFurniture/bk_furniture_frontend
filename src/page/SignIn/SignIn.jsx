import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {Divider} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import {createTheme} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FaceImg from 'asset/img/Facebook.svg'
import GoogleImg from 'asset/img/Google.svg'
import FacebookLogin from 'react-facebook-login'
import {GoogleLogin} from 'react-google-login'
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="./">
        BK Furniture
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }
  const responseFacebook = (response) => {
    console.log(response)
  }
  const responseGoogle = (response) => {
    console.log(response)
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider style={{marginTop: 10}}>Or continue with</Divider>
      <Grid container justifyContent="center" style={{margin: '10px 0'}}>
        <FacebookLogin
          appId="243088701384995"
          autoLoad
          textButton=""
          buttonStyle={{all: 'unset', marginRight: 15, cursor: 'pointer'}}
          icon={<img src={FaceImg} style={{height: 35}} />}
          fields="name,email,picture"
          callback={responseFacebook}
        />
        <GoogleLogin
          clientId="286394655273-rs58iifdmnkpgkerd4872fjs9mog27dv.apps.googleusercontent.com"
          buttonText=""
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                cursor: 'pointer',
                border: 'none',
                backgroundColor: '#E0E0',
              }}
            >
              <img src={GoogleImg} style={{height: 35, marginRight: 15}} />
            </button>
          )}
          cookiePolicy={'single_host_origin'}
        />
      </Grid>
      <Copyright sx={{mt: 8, mb: 4}} />
    </Container>
  )
}
