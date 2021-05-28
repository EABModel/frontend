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

const postProductsRegister = async (products: ProductPostFields[]): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/catalogue/add-many-products',
    data: products,
  })
    .then((response: AxiosResponse<Record<string, never>>) => {
      return response?.data;
    })
    .catch((error: Error) => {
      throw error;
    });
};

const getShopProducts = async (shopId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/catalogue/shop/${shopId}`,
  })
    .then((response: AxiosResponse<Product[]>) => {
      return response?.data;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const postProductDelete = async (productId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'delete',
    url: '/catalogue/delete-product',
    data: {
      id: productId,
    },
  })
    .then((response: AxiosResponse<any>) => {
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
  postProductsRegister,
  postProductDelete,
};

export default catalogueService;
