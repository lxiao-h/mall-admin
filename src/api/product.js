import axios from '@/axiosApi';

export default {
  getAll(params) {
    return axios.get('/products/all', { params });
  },
  getProduct(params) {
    return axios.get(`/products/${params.id}`);
  },
  getProductCategory(params) {
    return axios.get('/category/all', { params });
  },
  editProduct(params) {
    return axios.put('/products/edit', params);
  },
};
