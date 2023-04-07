import axiosClient from './axios.js'

export class Rating {
  endpoint = '/ratings'
  async create(data) {
    return axiosClient.post(`${this.endpoint}/`, data)
  }
  async getBySlug(slg) {
    return axiosClient.get(`${this.endpoint}/products/${slg}/`)
  }
}

export default new Rating()
