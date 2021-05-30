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

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
}

interface DispatchProps {
  addProductToCatalogueInteractor: typeof catalogueInteractors.addProductToCatalogueInteractor;
  resetCatalogueInteractor: typeof catalogueInteractors.resetCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {
  expanded: string | false;
  handleChange: (panel: string) => any;
  panel: string;
  heading: string;
  summary: string;
}

const CreateProduct: FC<Props> = (props: Props) => {
  const { expanded, handleChange, panel, heading, summary, shop, catalogue } = props;
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [os, setOS] = useState('');
  const [color, setColor] = useState('');
  const [inches, setInches] = useState('');
  const [price, setPrice] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (catalogue.addProductToCatalogue.success) {
      setShowSuccessMessage(true);
      props.resetCatalogueInteractor();
    }
  }, [catalogue.addProductToCatalogue, setShowSuccessMessage, props.resetCatalogueInteractor]);

  const handleCancelCreate = (): void => {
    setName('');
    setBrand('');
    setOS('');
    setColor('');
    setInches('');
    setPrice('');
  };

  const handleCreate = (): void => {
    const productAuthFields: ProductPostFields = {
      shopId: '1', // shop.id,
      name,
      brand,
      os,
      color,
      inches,
      price,
    };
    props.addProductToCatalogueInteractor(productAuthFields);
    // Called to reset the state
    handleCancelCreate();
  };

  const fieldsVerified: boolean =
    verifyString(name) &&
    verifyString(brand) &&
    verifyString(os) &&
    verifyString(color) &&
    verifyString(inches) &&
    verifyString(price);

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === panel} onChange={handleChange(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography className={styles.heading}>{heading}</Typography>
        <Typography className={styles.secondaryHeading}>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          value={name}
          variant="standard"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={brand}
          variant="standard"
          required
          fullWidth
          id="brand"
          label="Brand"
          name="brand"
          onChange={(event) => setBrand(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={os}
          variant="standard"
          required
          fullWidth
          id="os"
          label="Operative System"
          name="os"
          onChange={(event) => setOS(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={color}
          variant="standard"
          required
          fullWidth
          id="color"
          label="Device Color"
          name="color"
          onChange={(event) => setColor(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={inches}
          variant="standard"
          type="number"
          required
          fullWidth
          id="inches"
          label="Inches"
          name="inches"
          onChange={(event) => setInches(event.target.value)}
        />
      </AccordionDetails>
      <AccordionDetails>
        <TextField
          value={price}
          variant="standard"
          type="number"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          onChange={(event) => setPrice(event.target.value)}
        />
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small" onClick={() => handleCancelCreate()}>
          Cancel
        </Button>
        <Button size="small" color="primary" disabled={!fieldsVerified} onClick={handleCreate}>
          Create Product
        </Button>
      </AccordionActions>
      {catalogue.addProductToCatalogue.loading && <LinearProgress />}
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Product successfully created, you can close this menu now.'}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
