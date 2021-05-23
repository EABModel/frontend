export interface CatalogueState {
  products: Product[];
  getCatalogueStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  addProductToCatalogue: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  removeProductFromCatalogue: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  os: string;
  color: string;
  inches: number;
  price: number;
}

export interface ProductPostFields {
  shopId: string;
  name: string;
  brand: string;
  os: string;
  color: string;
  inches: string;
  price: string;
}
