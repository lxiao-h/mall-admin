import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// console.log('axios  - 9', config);
instance.interceptors.request.use((config) => config,
  (error) => Promise.reject(error));

instance.interceptors.response.use((response) => response,
  (error) => Promise.reject(error));

export default instance;
