import { AxiosResponse } from 'axios';
import { PostUserFields } from '../redux/types/UserTypes';
import { axiosBaseInstance } from './config';

const getUser = async (userId: string) => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/user/${userId}`,
  })
    .then((response: AxiosResponse<any>) => {
      return response?.data;
    })
    .catch((error: Error) => {
      console.log(error);
    });
};

const postUser = async (authFields: PostUserFields) => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/user/create',
    data: {
      username: authFields.username,
      email: authFields.email,
      password: authFields.password,
      confirmPassword: authFields.confirmPassword,
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

const usersService = {
  getUser,
  postUser,
};

export default usersService;
