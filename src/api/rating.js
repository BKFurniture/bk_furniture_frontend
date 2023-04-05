import axiosClient from './axios.js'

export class Rating {
  endpoint = '/ratings'
  async create(data) {
    return axiosClient.post(`${this.endpoint}/`, data)
  }
}

export default new Rating()
