import axios from '@/axiosApi';

export default {
  getAll(params) {
    return axios.get('/products/all', { params });
  },
  getProduct(id, params) {
    return axios.get(`/products/${id}`, { params });
  },
  getProductCategory(params) {
    return axios.get('/category/all', { params });
  },
  editProduct(params) {
    return axios.put('/products/edit', params);
  },
  addProduct(params) {
    return axios.post('/products/add', params);
  },
  deleteProduct(id, params) {
    return axios.delete(`/products/${id}`, { params });
  },
};
