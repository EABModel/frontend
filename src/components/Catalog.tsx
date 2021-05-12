import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { CatalogState, Product } from '../redux/types/CatalogTypes';
import { CatalogCard } from './CatalogCard';
import UseStyles from '../styles/CatalogStyles';
import Box from '@material-ui/core/Box';

interface StateProps {
  catalog: CatalogState;
}

type Props = StateProps;

const Catalog: FC<Props> = (props: Props) => {
  const classes = UseStyles();
  const { catalog } = props;
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" m={1} p={1} bgcolor="background.paper">
      {catalog?.products.map((product: Product) => (
        <Box className={classes.cardContainer} key={product.id}>
          <CatalogCard specs={product} />
        </Box>
      ))}
    </Box>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    catalog: state.catalog,
  };
};

export default connect(mapStateToProps)(Catalog);
