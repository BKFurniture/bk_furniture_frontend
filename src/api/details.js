import axiosClient from "./axios.js";

const detailsApi = {
  get: (slug) => {
    const url = `products/detail/${slug}`;
    return axiosClient.get(url);
  },
};

export default detailsApi;
