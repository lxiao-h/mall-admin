import axios from '@/axiosApi';

export default {
  addCategory(params) {
    return axios.post('/category/add', params);
  },
  editCategory(params) {
    return axios.put('/category/edit', params);
  },
  deleteCategory(id, params) {
    return axios.delete(`/category/${id}`, { params });
  },
  getProductCategory(params) {
    return axios.get('/category/all', { params });
  },
};
