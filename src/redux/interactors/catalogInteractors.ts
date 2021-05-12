import { catalogActions } from '../slices/catalogSlice';
// import catalogServices from '../../services/catalogServices';
import { buildInteractor, buildInteractorNoParams } from './base';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

export const addCatalogInteractor = buildInteractorNoParams(
  catalogActions.loadingAddCatalog,
  catalogActions.successAddCatalog,
  catalogActions.errorAddCatalog,
  null,
);

export const addProductToCatalogInteractor = buildInteractor(
  catalogActions.loadingAddProductToCatalog,
  catalogActions.successAddProductToCatalog,
  catalogActions.errorAddProductToCatalog,
  null,
);

export const removeProductFromCatalogInteractor = buildInteractor(
  catalogActions.loadingRemoveProductFromCatalog,
  catalogActions.successRemoveProductFromCatalog,
  catalogActions.errorRemoveProductFromCatalog,
  null,
);

export const resetCatalogInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(catalogActions.resetCatalog());
  };
};
