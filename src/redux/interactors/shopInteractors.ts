import { shopActions } from '../slices/shopSlice';
import shopServices from '../../services/shopServices';
import { ShopBackendState } from '../types/CompanyTypes';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { buildInteractor } from './base';

export const setShopInteractor = (shop: ShopBackendState) => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(shopActions.setShop(shop));
  };
};

export const addShopInteractor = buildInteractor(
  shopActions.loadingAddShop,
  shopActions.successAddShop,
  shopActions.errorAddShop,
  shopServices.postShopRegister,
);

export const removeShopInteractor = buildInteractor(
  shopActions.loadingRemoveShop,
  shopActions.successRemoveShop,
  shopActions.errorRemoveShop,
  null,
);

export const updateShopInteractor = buildInteractor(
  shopActions.loadingUpdateShop,
  shopActions.successUpdateShop,
  shopActions.errorUpdateShop,
  null,
);

export const resetShopStatusInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(shopActions.resetShopStatus());
  };
};

export const resetShopInteractor = () => {
  return (dispatch: ThunkDispatch<RootState, void, Action>): void => {
    dispatch(shopActions.resetShop());
  };
};
