import React, { FC, useState, useEffect } from 'react';
import useStyles from '../../styles/AccordionMenuStyles';
import { ShopState } from '../../redux/types/ShopTypes';
import { CatalogueState } from '../../redux/types/CatalogueTypes';
import * as catalogueInteractors from '../../redux/interactors/catalogueInteractors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  Accordion,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';

//Le paso lo que quiero ver del estado de catalogueService(CatalogueMenu.tsx)
// interface StateProps {
//     shop: ShopState; //confirmar que es la misma tienda, sacar id shop
//     catalogue: CatalogueState; //sacar lista de productos
//   }
//acciones
// interface DispatchProps {
//     deleteProductFromCatalogueInteractor: typeof catalogueInteractors.deleteProductFromCatalogueInteractor;
// }

// interface Props extends StateProps, DispatchProps {
//     expanded: string | false;
//     handleChange: (panel: string) => any;
//     panel: string;
//     heading: string;
//     summary: string;
//   }

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
}

interface DispatchProps {
  addProductToCatalogueInteractor: typeof catalogueInteractors.addProductToCatalogueInteractor;
  resetCatalogueInteractor: typeof catalogueInteractors.resetCatalogueInteractor;
  deleteProductFromCatalogueInteractor: typeof catalogueInteractors.deleteProductFromCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {
  expanded: string | false;
  handleChange: (panel: string) => any;
  panel: string;
  heading: string;
  summary: string;
}

const DeleteProduct: FC<Props> = (props: Props) => {
  const { expanded, handleChange, panel, heading, summary, catalogue } = props;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (catalogue.deleteProductFromCatalogue.success) {
      setShowSuccessMessage(true);
      props.resetCatalogueInteractor();
    }
  }, [catalogue.deleteProductFromCatalogue, setShowSuccessMessage, props.resetCatalogueInteractor]);

  const handleDelete = (id: string): void => {
    props.deleteProductFromCatalogueInteractor(id);
  };

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <List dense>
        {catalogue.products.map((product) => {
          // const labelId = `checkbox-list-secondary-label-${product.id}`;
          return (
            <ListItem key={product.id} button>
              <ListItemText
                id={product.id}
                primary={`${product.name}`}
                secondary={`Brand: ${product.brand} ${product.os} Color: ${product.color}`}
              />
              <ListItemSecondaryAction>
                <Button size="small" variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      {catalogue.deleteProductFromCatalogue.loading && <LinearProgress />}
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Product successfully deleted, you can close this menu now.'}
          openedStateInParent={setShowSuccessMessage}
        />
      )}
    </Accordion>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    shop: state.shop,
    catalogue: state.catalogue,
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProduct);
