import { AxiosResponse } from 'axios';
import { PostUserFields, UserAuthFields } from '../redux/types/UserTypes';
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

const postUserLogin = async (authFields: UserAuthFields) => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/user/auth',
    data: {
      email: authFields.email,
      password: authFields.password,
    },
  })
    .then((response: AxiosResponse<any>) => {
      console.log(response?.data);
      return response?.data;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const postUserRegister = async (authFields: PostUserFields) => {
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
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const usersService = {
  getUser,
  postUserLogin,
  postUserRegister,
};

export default usersService;
