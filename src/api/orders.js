import axiosClient from './axios'

const ordersApi = {
  get: () => {
    const url = `/orders/`;
    return axiosClient.get(url);
  }
}

export default ordersApi