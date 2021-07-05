import { AxiosResponse } from 'axios';
import { PostCompanyFields, RegisterCompanyFields, CompanyBackendState } from '../redux/types/CompanyTypes';
import { axiosBaseInstance } from './config';

const postCompanyLogin = async (authFields: PostCompanyFields): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/company/login',
    data: {
      name: authFields.name,
      password: authFields.password,
    },
  })
    .then((response: AxiosResponse<CompanyBackendState>) => {
      return response?.data;
    })
    .catch((error: any) => {
      // TODO: Implement logging functionality for future purposes
      // TOFIX: always get Error: Network Error, cors must be enabled on api, not nginx
      console.log(error);
      throw error;
    });
};

const postCompanyRegister = async (authFields: RegisterCompanyFields): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/company/create',
    data: {
      name: authFields.name,
      email: authFields.email,
      password: authFields.password,
    },
  })
    .then((response: AxiosResponse<CompanyBackendState>) => {
      return response?.data;
    })
    .catch((error: any) => {
      // TODO: Implement logging functionality for future purposes
      // TOFIX: always get Error: Network Error, cors must be enabled on api, not nginx
      console.log(error);
      throw error;
    });
};

const getCompanyUsers = async (companyId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/company/${companyId}/users`,
  })
    .then((response: AxiosResponse<CompanyBackendState>) => {
      return response?.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const getCompanyShops = async (companyId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/company/${companyId}/shops`,
  })
    .then((response: AxiosResponse<CompanyBackendState>) => {
      return response?.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const companyServices = {
  postCompanyLogin,
  postCompanyRegister,
  getCompanyUsers,
  getCompanyShops,
};

export default companyServices;
