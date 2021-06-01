import { CatalogueState } from '../types/CatalogueTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CatalogueState = {
  products: [],
  getCatalogueStatus: {
    loading: false,
    success: false,
    error: false,
  },
  addProductToCatalogue: {
    loading: false,
    success: false,
    error: false,
  },
  addProductsToCatalogue: {
    loading: false,
    success: false,
    error: false,
  },
  deleteProductFromCatalogue: {
    loading: false,
    success: false,
    error: false,
  },
};

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    loadingGetCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        getCatalogueStatus: { loading: true, success: false, error: false },
      };
    },
    successGetCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        products: [...action?.payload],
        getCatalogueStatus: { loading: false, success: true, error: false },
      };
    },
    errorGetCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        getCatalogueStatus: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingAddProductToCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        addProductToCatalogue: { loading: true, success: false, error: false },
      };
    },
    successAddProductToCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
        addProductToCatalogue: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorAddProductToCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        addProductToCatalogue: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingAddProductsToCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        addProductsToCatalogue: { loading: true, success: false, error: false },
      };
    },
    successAddProductsToCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        addProductsToCatalogue: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorAddProductsToCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        addProductsToCatalogue: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    loadingDeleteProductFromCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        deleteProductFromCatalogue: { loading: true, success: false, error: false },
      };
    },
    successDeleteProductFromCatalogue: (state: CatalogueState, action) => {
      const newArray = state.products.filter((product) => product.id !== action?.payload?.id);
      return {
        ...state,
        products: newArray,
        deleteProductFromCatalogue: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorDeleteProductFromCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        deleteProductFromCatalogue: {
          loading: false,
          success: false,
          error: action.payload || true,
        },
      };
    },
    resetCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const catalogueReducer = catalogueSlice.reducer;
export const catalogueActions = catalogueSlice.actions;
