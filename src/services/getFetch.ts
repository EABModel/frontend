import axios from 'axios';
// import Response from '../interfaces/response';


export default async function getFetch(path: string, token: string = '', session: string = 'default') {
  const host = 'http://localhost';
  let response: any;

  await axios(`${host}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Session: session,
    },
  })
  .then((data) => response = data)
  .catch((error) => console.log(error));

  return { status: response.status, body: response };
}