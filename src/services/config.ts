import axios from 'axios';

export const axiosBaseInstance = axios.create({
  baseURL: 'https://eabmodel.herokuapp.com/',
});
