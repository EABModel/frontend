/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios';
import { PostUserFields, UserAuthFields } from '../redux/types/UserTypes';
import { axiosBaseInstance } from './config';

const getUser = async (userId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'get',
      url: `/user/${userId}`,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const postUserLogin = async (authFields: UserAuthFields): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: '/user/auth',
      data: {
        email: authFields.email,
        password: authFields.password,
      },
    });
    return response?.data?.user;
  } catch (error) {
    throw error;
  }
};

const postUserRegister = async (authFields: PostUserFields): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: '/user/create',
      data: {
        username: authFields.username,
        email: authFields.email,
        password: authFields.password,
        confirmPassword: authFields.confirmPassword,
      },
    });
    return response?.data?.user;
  } catch (error) {
    throw error;
  }
};

const usersService = {
  getUser,
  postUserLogin,
  postUserRegister,
};

export default usersService;
