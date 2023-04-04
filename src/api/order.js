import axiosClient from './axios.js'

export class Order {
  endpoint = '/orders'
  async getList(filters) {
    return axiosClient.get(`${this.endpoint}/`, {params: filters})
  }
  async getById(id) {
    return axiosClient.get(`${this.endpoint}/${id}/`)
  }
  async checkout(data) {
    return axiosClient.post(`${this.endpoint}/checkout/`, data)
  }
}

export default new Order()
