import { AxiosResponse } from 'axios';
import { ProductPostFields, Product } from '../redux/types/CatalogueTypes';
import { axiosBaseInstance } from './config';

const postProductRegister = async (authFields: ProductPostFields): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/catalogue/add-single-product',
    data: {
      shopId: authFields.shopId,
      name: authFields.name,
      brand: authFields.brand,
      os: authFields.os,
      color: authFields.color,
      inches: authFields.inches,
      price: authFields.price,
    },
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

const getShopProducts = async (shopId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/catalogue/${shopId}`,
  })
    .then((response: AxiosResponse<Product[]>) => {
      // Recieves an empty object to avoid changing shop state
      return response?.data;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const catalogueService = {
  postProductRegister,
  getShopProducts,
};

export default catalogueService;
