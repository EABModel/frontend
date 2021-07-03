/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios';
import { ProductPostFields, Product } from '../redux/types/CatalogueTypes';
import { axiosBaseInstance } from './config';

const postProductRegister = async (authFields: ProductPostFields): Promise<any> => {
  try {
    const response: AxiosResponse<Record<string, never>> = await axiosBaseInstance({
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
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const postProductsRegister = async (products: ProductPostFields[]): Promise<any> => {
  try {
    const response: AxiosResponse<Record<string, never>> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: '/catalogue/add-many-products',
      data: products,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getShopProducts = async (shopId: string): Promise<any> => {
  try {
    const response: AxiosResponse<Product[]> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'get',
      url: `/catalogue/shop/${shopId}`,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const postProductDelete = async (productId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'delete',
      url: `/catalogue/delete-product/${productId}`,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const catalogueService = {
  postProductRegister,
  getShopProducts,
  postProductsRegister,
  postProductDelete,
};

export default catalogueService;
