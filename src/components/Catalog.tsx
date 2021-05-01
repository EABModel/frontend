import React, { FC } from 'react';
import { CatalogCard } from './CatalogCard';
import UseStyles from '../styles/CatalogStyles';
import Box from '@material-ui/core/Box';


const specs = {
  name: 'IPhone XR',
  brand: 'Apple',
  os: 'iOS',
  color: 'Space Gray',
  inches: 4
};

const specs2 = {
  name: 'IPhone 8',
  brand: 'Apple',
  os: 'iOS',
  color: 'White',
  inches: 5
};

const specs3 = {
  name: 'Huawei Mate 20 Light',
  brand: 'Huawei',
  os: 'Android',
  color: 'Black',
  inches: 5
};

const specs4 = {
  name: 'Samsung Galaxy S10',
  brand: 'Samsung',
  os: 'Android',
  color: 'Gray',
  inches: 4
};

const specs5 = {
  name: 'Pixel 2',
  brand: 'Samsun',
  os: 'Android',
  color: 'White',
  inches: 4
};

const specs6 = {
  name: 'IPhone 12',
  brand: 'Apple',
  os: 'iOS',
  color: 'Space Gray',
  inches: 5
};

export const Catalog: FC = () => {
  const classes = UseStyles();

  return (
    <Box display="flex" flexWrap='wrap' justifyContent="space-evenly" m={1} p={1} bgcolor="background.paper">
      <Box className={classes.cardContainer}>
        <CatalogCard specs={specs} />
      </Box>
      <Box className={classes.cardContainer}>
        <CatalogCard specs={specs2} />
      </Box>
      <Box className={classes.cardContainer}>
        <CatalogCard specs={specs3} />
      </Box>
      <Box className={classes.cardContainer}>
        <CatalogCard specs={specs4} />
      </Box>
      <Box className={classes.cardContainer}>
        <CatalogCard specs={specs5} />
      </Box>
      <Box className={classes.cardContainer}>
        <CatalogCard specs={specs6} />
      </Box>
    </Box>
  );
};
