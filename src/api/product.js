import axiosClient from './axios.js'

export class Product {
  endpoint = '/products'
  async getList(filters) {
    const {category_slug, ...res} = filters
    return axiosClient.get(
      `${this.endpoint}/${category_slug ? category_slug + '/' : ''}`,
      {
        params: res,
      },
    )
  }
  async getCategories(filters) {
    return axiosClient.get(`${this.endpoint}/category-list/`, {params: filters})
  }
  async uploadCustomDesign(data) {
    return axiosClient.post(`${this.endpoint}/custom-design/`, data)
  }
}

export default new Product()
