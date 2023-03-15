import axiosClient from './axios.js'

export class Product {
  endpoint = '/products'
  async getList(filters) {
    return axiosClient.get(`${this.endpoint}/`, {params: filters})
  }
}

export default new Product()
