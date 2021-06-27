// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck projectActions properties generated at runtime
import { shopActions } from '../slices/shopSlice';
import shopServices from '../../services/shopServices';
import { buildInteractor, buildInteractorDirectAction, buildInteractorDirectActionNoParams } from './base';

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

export const setShopInteractor = buildInteractorDirectAction(shopActions.setShop);

export const resetShopStatusInteractor = buildInteractorDirectActionNoParams(shopActions.resetShopStatus);

export const resetShopInteractor = buildInteractorDirectActionNoParams(shopActions.resetShop);
