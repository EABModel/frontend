import { BaseRequestStatus } from './base';

export interface ShopState {
  id: string;
  companyId: string;
  name: string;
  location: string;
  addShopStatus: BaseRequestStatus;
  removeShopStatus: BaseRequestStatus;
  updateShopStatus: BaseRequestStatus;
}

export interface PostShopFields {
  companyId: string;
  name: string;
  location: string;
}
