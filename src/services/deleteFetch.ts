import axios from 'axios';


export default async function fetchData(path: string, token: string = '', session: string = 'default') {
  const host = 'http://localhost';
  let response: any;

  await axios({
    headers: {
      Authorization: `Bearer ${token}`,
      Session: session,
    },
    method: 'delete',
    url: `${host}/${path}`,
  })
  .then((data) => response = data)
  .catch((error) => console.log(error));

  return { status: response.status, body: response };
}