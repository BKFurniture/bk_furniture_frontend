import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {Divider} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import {createTheme} from '@mui/material/styles'

import Typography from '@mui/material/Typography'
import userApi from 'api/user'
import FaceImg from 'asset/img/Facebook.svg'
import GoogleImg from 'asset/img/Google.svg'
import {useEffect, useState} from 'react'
import FacebookLogin from 'react-facebook-login'
import {GoogleLogin} from 'react-google-login'
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import {useNavigate} from 'react-router-dom'
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

export default function SignUp() {
  let navigate = useNavigate()
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    repeatPassword: '',
  })

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value != user.password) {
        return false
      }
      return true
    })
    ValidatorForm.addValidationRule('minLength', (value) => {
      if (value.length < 6) {
        return false
      }
      return true
    })
    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch')
    }
  }, [user])
  const handleSubmit = () => {
    const {repeatPassword, ...rest} = user
    userApi.signUp(rest).then((res) => {
      console.log(res, 'sign-up')
      navigate('/sign-in')
    })
    console.log('Submit', user)
  }
  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }
  const responseFacebook = (response) => {
    console.log(response)
  }
  const responseGoogle = (response) => {
    console.log(response)
    userApi.googleLogin(response.tokenId)
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
          Sign up
        </Typography>
        <ValidatorForm onSubmit={handleSubmit} sx={{mt: 1}}>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
            }}
          >
            <TextValidator
              label="First Name"
              onChange={handleChange}
              name="first_name"
              variant="outlined"
              errorMessages={['This field is required']}
              validators={['required']}
              sx={{marginRight: 2}}
              value={user.first_name}
            />
            <TextValidator
              onChange={handleChange}
              name="last_name"
              label="Last Name"
              variant="outlined"
              errorMessages={['This field is required']}
              validators={['required']}
              value={user.last_name}
            />
          </Box>
          <TextValidator
            onChange={handleChange}
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            errorMessages={['This field is required', 'Email is not valid']}
            validators={['required', 'isEmail']}
            value={user.email}
          />
          <TextValidator
            onChange={handleChange}
            margin="normal"
            fullWidth
            id="username"
            label="User Name"
            name="username"
            errorMessages={['This field is required']}
            validators={['required']}
            value={user.username}
          />
          <TextValidator
            margin="normal"
            label="Password"
            onChange={handleChange}
            name="password"
            type="password"
            validators={['required', 'minLength']}
            errorMessages={[
              'This field is required',
              'Password must be at least 6 characters',
            ]}
            value={user.password}
            fullWidth
          />
          <TextValidator
            margin="normal"
            label="Repeat Password"
            fullWidth
            onChange={handleChange}
            name="repeatPassword"
            type="password"
            validators={['isPasswordMatch', 'required']}
            errorMessages={['password mismatch', 'this field is required']}
            value={user.repeatPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                {'Already had an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
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
