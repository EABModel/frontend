import { AxiosResponse } from 'axios';
import { PostUserFields, UserAuthFields } from '../redux/types/UserTypes';
import { axiosBaseInstance } from './config';

const getUser = async (userId: string): Promise<any> => {
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

const postUserLogin = async (authFields: UserAuthFields): Promise<any> => {
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
      localStorage.setItem('Token', response?.data['token']);
      return response?.data?.user;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const postUserRegister = async (authFields: PostUserFields): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/user/create',
    data: {
      username: authFields.username,
      email: authFields.email,
      companyId: authFields.companyId,
      shopId: authFields.shopId,
      password: authFields.password,
    },
  })
    .then((response: AxiosResponse<Record<string, never>>) => {
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
