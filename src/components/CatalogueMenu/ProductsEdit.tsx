import React, { FC, useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';
import useStyles from '../../styles/AccordionMenuStyles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ShopState } from '../../redux/types/ShopTypes';
import { CatalogueState, ProductPostFields } from '../../redux/types/CatalogueTypes';
import * as catalogueInteractors from '../../redux/interactors/catalogueInteractors';
import verifyString from '../../utils/globalHelpers/verifyString';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  AccordionActions,
  Button,
  TextField,
  LinearProgress,
} from '@material-ui/core';
import EditProduct from '../../components/CatalogueMenu/ProductEdit';
import { Product } from '../../redux/types/CatalogueTypes';
import { UserState } from '../../redux/types/UserTypes';

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
  user: UserState;
}

interface DispatchProps {
  getCatalogueInteractor: typeof catalogueInteractors.getCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {}

const ProductsShow: FC<Props> = (props: Props) => {
  const styles = useStyles();
  const { shop, catalogue, user } = props;
  console.log('user', user);
  const [products, setProducts] = useState<Product[]>(catalogue.products);
  useEffect(() => {
    props.getCatalogueInteractor('1');
  }, [props.getCatalogueInteractor, catalogue.editProductFromCatalogue.success]);

  useEffect(() => {
    setProducts(catalogue.products);
  }, [props.getCatalogueInteractor, catalogue.getCatalogueStatus.success]);

  return (
    <>
      <div className={styles.mainContainer}>
        <h3>Store Products</h3>
      </div>
      {products.map((product) => {
        return (
          <EditProduct
            key={product.id}
            panel={'panel1'}
            heading={product.name}
            summary={'Press to edit this product'}
            product={product}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
    catalogue: state.catalogue,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...catalogueInteractors,
    },
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductsShow);
