import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kakao-tech-campus-mock-server.vercel.app/api/v1',
});

export default api;
