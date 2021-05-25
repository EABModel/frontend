import React, { FC, useEffect, useState } from 'react';
import { CatalogueState, ProductPostFields } from '../../redux/types/CatalogueTypes';
import { ShopState } from '../../redux/types/ShopTypes';
import * as catalogueInteractors from '../../redux/interactors/catalogueInteractors';
import { RootState } from '../../redux/store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { Fab, LinearProgress, Paper, Typography } from '@material-ui/core';
import { CSVReader } from 'react-papaparse';
import useStyles from '../../styles/AccordionMenuStyles';
import { FaFileCsv } from 'react-icons/fa';
import DissmisibleSuccessAlert from '../GeneralUseComponents/DissmissibleSuccessAlert';

interface StateProps {
  shop: ShopState;
  catalogue: CatalogueState;
}

interface DispatchProps {
  addProductsToCatalogueInteractor: typeof catalogueInteractors.addProductToCatalogueInteractor;
  resetCatalogueInteractor: typeof catalogueInteractors.resetCatalogueInteractor;
}

interface Props extends StateProps, DispatchProps {}

const CreateProductsCSV: FC<Props> = (props: Props) => {
  const styles = useStyles();
  const [csvData, setData] = useState<Array<any> | null>(null);
  const { shop, catalogue } = props;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (catalogue.addProductsToCatalogue.success) {
      setShowSuccessMessage(true);
      props.resetCatalogueInteractor();
    }
  }, [catalogue.addProductsToCatalogue, setShowSuccessMessage, props.resetCatalogueInteractor]);

  const handleOnDrop = (data: any) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
    setData(data);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
    setData(null);
  };

  function isValid(productAuthFields: ProductPostFields): boolean {
    let validated = true;
    Object.values(productAuthFields).forEach((value) => {
      if (value == undefined || value == '') {
        validated = false;
      }
    });
    return validated;
  }

  const handleUpload = (): void => {
    const products: ProductPostFields[] = [];
    csvData?.slice(1).forEach((dataRow: { data: any }) => {
      const productAuthFields: ProductPostFields = {
        shopId: shop.id,
        name: dataRow.data[0],
        brand: dataRow.data[1],
        os: dataRow.data[2],
        color: dataRow.data[3],
        inches: dataRow.data[4],
        price: dataRow.data[5],
      };
      // TODO: check if it's necessary to check if attributes make sense (like os being part of a valid list)
      if (isValid(productAuthFields)) {
        console.log(isValid(productAuthFields));
        console.log('A');
        products.push(productAuthFields);
      }
      // props.addProductToCatalogueInteractor(productAuthFields);
      // Called to reset the state
      // handleCancelCreate();
    });
    console.log(products);
    props.addProductsToCatalogueInteractor(products);
    // const productAuthFields: ProductPostFields = {
    //   shopId: shop.id,
    //   name,
    //   brand,
    //   os,
    //   color,
    //   inches,
    //   price,
    // };
    // props.addProductToCatalogueInteractor(productAuthFields);
    // Called to reset the state
    setData(null);
  };

  return (
    <Paper elevation={1}>
      <div className="flex-container-between">
        <Typography className={styles.heading}>Import Products from CSV</Typography>
        <div className="flex-container-evenly">
          <CSVReader onDrop={handleOnDrop} onError={handleOnError} addRemoveButton onRemoveFile={handleOnRemoveFile}>
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
          <Fab color="primary" className={styles.fab} onClick={handleUpload}>
            <FaFileCsv style={{ fontSize: 30 }} />
          </Fab>
        </div>
      </div>
      {catalogue.addProductsToCatalogue.loading && <LinearProgress />}
      {showSuccessMessage && (
        <DissmisibleSuccessAlert
          message={'Products successfully created, you can close this menu now.'}
          openedStateInParent={setShowSuccessMessage}
        />
      )}
    </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductsCSV);
