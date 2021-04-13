import React, { FC } from 'react';
import { Catalog } from './Catalog';


export const Home: FC = () => {
  
  // const history = useHistory();

  // const goToAboutPage = () => {
  //   history.push('/about');
  // }

  return (
    <div>
      <Catalog />
    </div>
  );
};
