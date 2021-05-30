import { CatalogueState } from '../types/CatalogueTypes';
import { createSlice } from '@reduxjs/toolkit';
import { AssignmentLate } from '@material-ui/icons';

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
  editProductFromCatalogue: {
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
    loadingEditProductFromCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        editProductFromCatalogue: { loading: true, success: false, error: false },
      };
    },
    successEditProductFromCatalogue: (state: CatalogueState, action) => {
      console.log('pppp', action.payload);
      let index = -1;
      const newProducts = [];
      for (let k = 0; k < state.products.length; k++) {
        if (state.products[k].id === action.payload.id) {
          newProducts.push(...state.products);
          newProducts[k] = {
            id: action.payload.id,
            name: action.payload.name,
            brand: action.payload.brand,
            color: action.payload.color,
            os: action.payload.os,
            inches: action.payload.inches,
            price: action.payload.price,
          };
          index = k;
          // state.products[k] = action.payload;
          k = state.products.length;
        }
      }
      return {
        ...state,
        products: index !== -1 ? state.products : newProducts,
        editProductFromCatalogue: {
          loading: false,
          success: true,
          error: false,
        },
      };
    },
    errorEditProductFromCatalogue: (state: CatalogueState, action) => {
      return {
        ...state,
        editProductFromCatalogue: {
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
        ...state.products,
      };
    },
  },
});

export const catalogueReducer = catalogueSlice.reducer;
export const catalogueActions = catalogueSlice.actions;
