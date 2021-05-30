import { AxiosResponse } from 'axios';
import { axiosBaseInstance } from './config';
// import { CallPostFields } from '../redux/types/ConnectionTypes';

// agregar linea a ConnectionTypes
// export interface CallState {
//   id: string;
//   employeeId: string;
//   shopId: string;
//   rating: string;
//   date: Date;
// }
// export interface CallPostFields {
//   employeeId: string;
//   shopId: string;
//   date: Date;
// }

// const postCallRegister = async (authFields: CallPostFields): Promise<any> => {
//   return await axiosBaseInstance({
//     headers: { 'Content-Type': 'application/json' },
//     method: 'post',
//     url: '/calls/new-call',
//     data: {
//       employeeId: authFields.employeeId,
//       shopId: authFields.shopId,
//       date: authFields.date,
//     },
//   })
//     .then((response: AxiosResponse<Record<string, never>>) => {
//       // Recieves an empty object to avoid changing shop state
//       return response?.data;
//     })
//     .catch((error: Error) => {
//       // TODO: Implement logging functionality for future purposes
//       throw error;
//     });
// };

const addRating = async (ratingValue: number, callId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'put',
    url: `/calls/${callId}`,
    data: {
      rating: ratingValue,
    },
  })
    .then((response: AxiosResponse<any>) => {
      return response?.data;
    })
    .catch((error: Error) => {
      // TODO: Implement logging functionality for future purposes
      throw error;
    });
};

const callServices = {
  // postCallRegister,
  addRating,
};

export default callServices;
