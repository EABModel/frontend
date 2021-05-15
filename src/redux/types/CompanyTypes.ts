export interface CompanyState {
  id: string;
  name: string;
  shops: Array<ShopBackendState>;
  loginCompanyStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  logoutCompanyStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
}

export interface PostCompanyFields {
  name: string;
  password: string;
}

export interface ShopBackendState {
  id: string;
  companyId: string;
  name: string;
  location: string;
}

export interface CompanyBackendState {
  id: string;
  name: string;
  shops: Array<ShopBackendState>;
}
