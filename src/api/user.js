import axiosClient from './axios.js'

export class User {
  endpoint = '/users'
  async signUp(data) {
    return axiosClient.post(`${this.endpoint}/register/`, data)
  }
  async login(data) {
    return axiosClient.post(`${this.endpoint}/token/`, data)
  }
  async googleLogin(token) {
    return axiosClient.post(`${this.endpoint}/google-authen/`, {
      auth_token: token,
    })
  }
}

export default new User()
