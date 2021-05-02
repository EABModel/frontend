import { AxiosResponse } from 'axios';
import { PostAuthFields } from '../redux/types/AuthTypes';
import { axiosBaseInstance } from './config';

const postAuth = async (authFields: PostAuthFields) => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/user/auth',
    data: {
      email: authFields.email,
      password: authFields.password,
      // csrf_token: 'valor del get'
    },
  })
    .then((response: AxiosResponse<any>) => {
      console.log(response?.data);
      return response?.data;
    })
    .catch((error: Error) => {
      console.log(error);
    });
};

const authServices = {
  postAuth,
};

export default authServices;
