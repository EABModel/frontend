import { AxiosResponse } from 'axios';
import { PostShopFields } from '../redux/types/ShopTypes';
import { axiosBaseInstance } from './config';

const postShopRegister = async (authFields: PostShopFields): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: '/shop/create',
    data: {
      companyId: authFields.companyId,
      name: authFields.name,
      location: authFields.location,
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

const shopServices = {
  postShopRegister,
};

export default shopServices;
