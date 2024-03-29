import axiosClient from './axios.js'

export class User {
  endpoint = '/users'
  async signUp(data) {
    return axiosClient.post(`${this.endpoint}/register/`, data)
  }
  async login(data) {
    return axiosClient.post(`${this.endpoint}/token/`, data)
  }
  async logout(data) {
    return axiosClient.post(`${this.endpoint}/logout/`, {refresh: data})
  }
  async googleLogin(token) {
    return axiosClient.post(`${this.endpoint}/google-authen/`, {
      auth_token: token,
    })
  }
  async facebookLogin(token) {
    return axiosClient.post(`${this.endpoint}/facebook-authen/`, {
      access_token: token,
      client_secret: '243088701384995',
    })
  }
  async detail() {
    return axiosClient.get(`${this.endpoint}/details/`)
  }
}

export default new User()
