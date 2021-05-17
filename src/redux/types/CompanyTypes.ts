export interface CompanyState {
  id: string;
  name: string;
  email: string;
  shops: Array<ShopBackendState>;
  registerCompanyStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
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

export interface RegisterCompanyFields {
  name: string;
  email: string;
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
  email: string;
  shops: Array<ShopBackendState>;
}
