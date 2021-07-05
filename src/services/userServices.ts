import { AxiosResponse } from 'axios';
import { PostUserFields, ReassignUserFields, UserAuthFields } from '../redux/types/UserTypes';
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

const deleteUser = async (id: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'delete',
    url: `/user/${id}`,
  })
    .then((response: AxiosResponse<string>) => {
      return response?.data;
    })
    .catch((error: Error) => {
      throw error;
    });
};

const reassignUserShop = async (authFields: ReassignUserFields): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'patch',
    url: `/user/set_shop`,
    data: {
      userId: authFields.userId,
      shopId: authFields.shopId,
    },
  })
    .then((response: AxiosResponse<Record<string, never>>) => {
      return response?.data;
    })
    .catch((error: Error) => {
      throw error;
    });
};

const usersService = {
  getUser,
  postUserLogin,
  postUserRegister,
  deleteUser,
  reassignUserShop,
};

export default usersService;
