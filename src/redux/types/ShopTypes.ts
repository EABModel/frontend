export interface ShopState {
  id: string;
  companyId: string;
  name: string;
  location: string;
  addShopStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  removeShopStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  updateShopStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
}

export interface PostShopFields {
  companyId: string;
  name: string;
  location: string;
}
