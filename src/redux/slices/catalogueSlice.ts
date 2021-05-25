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
  removeProductFromCatalogue: {
    loading: false,
    success: false,
    error: false,
  },
  addProductsToCatalogue: {
    loading: false,
    success: false,
    error: false,
  },
  removeProductsFromCatalogue: {
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
        products: [...action.payload],
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
    loadingRemoveProductFromCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        removeProductFromCatalogue: { loading: true, success: false, error: false },
      };
    },
    successRemoveProductFromCatalogue: (state: CatalogueState, action) => {
      const index = state.products.indexOf(action.payload);
      if (index > -1) state.products.splice(index, 1);
      return {
        ...state,
        removeProductFromCatalogue: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorRemoveProductFromCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        removeProductFromCatalogue: {
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
