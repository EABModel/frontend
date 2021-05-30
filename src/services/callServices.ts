import { AxiosResponse } from 'axios';
import { axiosBaseInstance } from './config';
import { ProductPostFields, Product } from '../redux/types/CatalogueTypes';

const postCallRegister = async (authFields: ProductPostFields): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/calls/new-call',
    // data: {
    //   employeeId = authFields.employeeId,
    //   shopId = authFields.shopId,
    //   rating = authFields.rating,
    //   date = authFields.date,
    // },
  })
    .then((response: AxiosResponse<Record<string, never>>) => {
      // Recieves an empty object to avoid changing shop state
      return response?.data;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const addRating = async (rating: number): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: `/calls`,
  })
    .then((response: AxiosResponse<any>) => {
      return response?.data;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const callServices = { postCallRegister };

export default callServices;
