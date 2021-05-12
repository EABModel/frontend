export interface CatalogState {
  products: Array<Product>;
  addCatalogStatus: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  updateCatalogStatus: {
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
