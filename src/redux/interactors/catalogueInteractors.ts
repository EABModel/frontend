// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck projectActions properties generated at runtime
import { catalogueActions } from '../slices/catalogueSlice';
import catalogueServices from '../../services/catalogueServices';
import { buildInteractor, buildInteractorDirectActionNoParams } from './base';

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

export const addProductsToCatalogueInteractor = buildInteractor(
  catalogueActions.loadingAddProductsToCatalogue,
  catalogueActions.successAddProductsToCatalogue,
  catalogueActions.errorAddProductsToCatalogue,
  catalogueServices.postProductsRegister,
);

export const deleteProductFromCatalogueInteractor = buildInteractor(
  catalogueActions.loadingDeleteProductFromCatalogue,
  catalogueActions.successDeleteProductFromCatalogue,
  catalogueActions.errorDeleteProductFromCatalogue,
  catalogueServices.postProductDelete,
);

export const resetCatalogueInteractor = buildInteractorDirectActionNoParams(catalogueActions.resetCatalogue);
