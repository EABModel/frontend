import axios from 'axios';

export const axiosBaseInstance = axios.create({
  baseURL: 'http://localhost',
});
