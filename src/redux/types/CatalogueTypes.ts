import { BaseRequestStatus } from './base';

export interface CatalogueState {
  products: Product[];
  getCatalogueStatus: BaseRequestStatus;
  addProductToCatalogueStatus: BaseRequestStatus;
  addProductsToCatalogueStatus: BaseRequestStatus;
  deleteProductFromCatalogueStatus: BaseRequestStatus;
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
  image: string;
}
