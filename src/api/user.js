import axios from '@/axiosApi';
// 用户接口
export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
};
