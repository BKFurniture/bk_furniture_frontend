import axiosClient from './axios.js'

export class User {
  endpoint = '/users'
  async signUp(data) {
    axiosClient.post(`${this.endpoint}/register`, data)
  }
  async login(data) {
    console.log(process.env.REACT_APP_DOMAIN, 'domin')
    axiosClient.post(`${this.endpoint}/token`, data)
  }
}

export default new User()
