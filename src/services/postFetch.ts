import axios, { AxiosResponse } from 'axios';


export default async function postFetch(_body: any, path: string, token: string = '', session: string = 'default') {
  const host = 'http://localhost';
  let response: any;

  await axios({
    headers: {
      Authorization: `Bearer ${token}`,
      Session: session,
    },
    method: 'post',
    url: `${host}/${path}`,
    data: _body,
  })
  .then((data: AxiosResponse<any>) => response = data)
  .catch((error: Error) => console.log(error));

  return { status: response.status, body: response };

}