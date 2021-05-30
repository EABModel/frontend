import React, { FC, useState } from 'react';
import useStyles from '../styles/AccordionMenuStyles';
import useCatalogueStyles from '../styles/CatalogueCardStyles';
import CreateSigleProductAccordionRow from '../components/CatalogueMenu/ProductRegister';
import EditProducts from '../components/CatalogueMenu/ProductsEdit';
import { CatalogueState, Product } from '../redux/types/CatalogueTypes';
import * as catalogueInteractors from '../redux/interactors/catalogueInteractors';
import { ShopState } from '../redux/types/ShopTypes';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import catalogueService from '../services/catalogueServices';
import { UserState } from '../redux/types/UserTypes';

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
  user: UserState;
}

interface Props extends StateProps {}

const CatalogueMenu: FC<Props> = (props: Props) => {
  const { catalogue, shop, user } = props;
  const styles = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [products, setProducts] = useState<Product[]>(catalogue.products);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.mainContainer}>
      <CreateSigleProductAccordionRow
        expanded={expanded}
        handleChange={handleChange}
        panel={'panel1'}
        heading={'Create Single Product'}
        summary={'Here you can create a product for this shop, giving all its necesary attributes.'}
      />
      <EditProducts />
    </div>
  );
};

// export default CatalogueMenu;

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
    catalogue: state.catalogue,
    user: state.user,
  };
};

// const mapDispatchToProps = (dispatch: any): DispatchProps => ({
//   ...bindActionCreators(
//     {
//       ...catalogueInteractors,
//     },
//     dispatch,
//   ),
// });

export default connect(mapStateToProps)(CatalogueMenu);
