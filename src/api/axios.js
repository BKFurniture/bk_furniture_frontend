import axios from 'axios'
import {getAccessToken} from 'helpers'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: getAccessToken(),
    }
    return config
  },
  (error) => {
    console.error('Looks like there was a problem. Status Code: ' + error)
  },
)

axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    let res = error.response
    if (res) {
      switch (res.status) {
        case 401:
          console.error('UNAUTHORIZED', res)
          // window.location.href = '/sign-in'
          break
        case 403:
          console.error('ACCESSDENIED', res)
          // window.location.href = '/sign-in'
          break
        default:
          break
      }
    }
    return {code: res.status, data: res.data}
  },
)

export default axiosClient
