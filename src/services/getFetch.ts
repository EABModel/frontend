import axios, { AxiosResponse } from 'axios';
// import Response from '../interfaces/response';


export default async function getFetch(path: string, token: string = '', session: string = 'default') {
  const host = 'http://localhost';
  let response: any;

  await axios(`${host}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Session: session,
    },
    method: 'get',
  })
  .then((data: AxiosResponse<any>) => response = data)
  .catch((error: Error) => console.log(error));

  return { status: response.status, body: response };
}