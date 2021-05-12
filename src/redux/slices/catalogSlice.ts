import { CatalogState } from '../types/CatalogTypes';
import { createSlice } from '@reduxjs/toolkit';

const specs = {
  id: '1',
  name: 'IPhone XR',
  brand: 'Apple',
  os: 'iOS',
  color: 'Space Gray',
  inches: 4,
  price: 600000,
};

const specs2 = {
  id: '2',
  name: 'IPhone 8',
  brand: 'Apple',
  os: 'iOS',
  color: 'White',
  inches: 5,
  price: 300000,
};

const specs3 = {
  id: '3',
  name: 'Huawei Mate 20 Light',
  brand: 'Huawei',
  os: 'Android',
  color: 'Black',
  inches: 5,
  price: 100000,
};

const specs4 = {
  id: '4',
  name: 'Samsung Galaxy S10',
  brand: 'Samsung',
  os: 'Android',
  color: 'Gray',
  inches: 4,
  price: 500000,
};

const specs5 = {
  id: '5',
  name: 'Pixel 2',
  brand: 'Samsun',
  os: 'Android',
  color: 'White',
  inches: 4,
  price: 550000,
};

const specs6 = {
  id: '6',
  name: 'IPhone 12',
  brand: 'Apple',
  os: 'iOS',
  color: 'Space Gray',
  inches: 5,
  price: 769000,
};

const initialState: CatalogState = {
  products: [specs, specs2, specs3, specs4, specs5, specs6],
  addCatalogStatus: {
    loading: false,
    success: false,
    error: false,
  },
  updateCatalogStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    loadingAddCatalog: (state: CatalogState) => {
      return {
        ...state,
        addCatalogStatus: { loading: true, success: false, error: false },
      };
    },
    successAddCatalog: (state: CatalogState, action) => {
      return {
        ...state,
        ...action.payload,
        addCatalogStatus: { loading: false, success: true, error: false },
      };
    },
    errorAddCatalog: (state: CatalogState, action) => {
      return {
        ...state,
        addCatalogStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingAddProductToCatalog: (state: CatalogState) => {
      return {
        ...state,
        updateCatalogStatus: { loading: true, success: false, error: false },
      };
    },
    successAddProductToCatalog: (state: CatalogState, action) => {
      return {
        ...state,
        catalog: [...state.products, action.payload],
        updateCatalogStatus: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorAddProductToCatalog: (state: CatalogState, action) => {
      return {
        ...state,
        updateCatalogStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingRemoveProductFromCatalog: (state: CatalogState) => {
      return {
        ...state,
        updateCatalogStatus: { loading: true, success: false, error: false },
      };
    },
    successRemoveProductFromCatalog: (state: CatalogState, action) => {
      const index = state.products.indexOf(action.payload);
      if (index > -1) state.products.splice(index, 1);
      return {
        ...state,
        updateCatalogStatus: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorRemoveProductFromCatalog: (state: CatalogState, action) => {
      return {
        ...state,
        updateCatalogStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    resetCatalog: (state: CatalogState) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const catalogReducer = catalogSlice.reducer;
export const catalogActions = catalogSlice.actions;
