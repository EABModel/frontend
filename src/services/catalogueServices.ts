import { AxiosResponse } from 'axios';
import { ProductPostFields, Product, ProductPutFields } from '../redux/types/CatalogueTypes';
import { axiosBaseInstance } from './config';
import { catalogueActions } from '../redux/slices/catalogueSlice';

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
  console.log('**##**');
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/catalogue/shop/${shopId}`,
  })
    .then((response: AxiosResponse<Product[]>) => {
      // Recieves an empty object to avoid changing shop state
      console.log('ñññ', response.data);

      return response?.data;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const putProductEdit = async (authFields: ProductPutFields): Promise<any> => {
  console.log(`/catalogue/${authFields.id}`);
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'put',
    url: `/catalogue/${authFields.id}`,
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
      console.log('**** > ****', response);
      catalogueActions.successEditProductFromCatalogue(response.data);
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
  putProductEdit,
};

export default catalogueService;
