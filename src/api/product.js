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
}

export default new Product()
