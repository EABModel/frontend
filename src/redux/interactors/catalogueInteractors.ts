import { catalogueActions } from '../slices/catalogueSlice';
import catalogueServices from '../../services/catalogueServices';
import { buildInteractor } from './base';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

export const getCatalogueInteractor = buildInteractor(
  catalogueActions.loadingGetCatalogue,
  catalogueActions.successGetCatalogue,
  catalogueActions.errorGetCatalogue,
  catalogueServices.getShopProducts,
);

export const addProductToCatalogueInteractor = buildInteractor(
  catalogueActions.loadingAddProductToCatalogue,
  catalogueActions.successAddProductToCatalogue,
  catalogueActions.errorAddProductToCatalogue,
  catalogueServices.postProductRegister,
);

export const removeProductFromCatalogueInteractor = buildInteractor(
  catalogueActions.loadingRemoveProductFromCatalogue,
  catalogueActions.successRemoveProductFromCatalogue,
  catalogueActions.errorRemoveProductFromCatalogue,
  null,
);

export const resetCatalogueInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(catalogueActions.resetCatalogue());
  };
};
