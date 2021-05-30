import { ShopState } from '../types/ShopTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ShopState = {
  id: '',
  companyId: '',
  name: '',
  location: '',
  addShopStatus: {
    loading: false,
    success: false,
    error: false,
  },
  removeShopStatus: {
    loading: false,
    success: false,
    error: false,
  },
  updateShopStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShop: (state: ShopState, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    loadingAddShop: (state: ShopState) => {
      return {
        ...state,
        addShopStatus: { loading: true, success: false, error: false },
      };
    },
    successAddShop: (state: ShopState) => {
      return {
        ...state,
        addShopStatus: { loading: false, success: true, error: false },
      };
    },
    errorAddShop: (state: ShopState, action) => {
      return {
        ...state,
        addShopStatus: { loading: false, success: false, error: action.payload || true },
      };
    },
    loadingRemoveShop: (state: ShopState) => {
      return {
        ...state,
        removeShopStatus: { loading: true, success: false, error: false },
      };
    },
    successRemoveShop: (state: ShopState) => {
      return {
        ...state,
        removeShopStatus: { loading: false, success: true, error: false },
      };
    },
    errorRemoveShop: (state: ShopState, action) => {
      return {
        ...state,
        removeShopStatus: { loading: false, success: false, error: action.payload || true },
      };
    },
    loadingUpdateShop: (state: ShopState) => {
      return {
        ...state,
        updateShopStatus: { loading: true, success: false, error: false },
      };
    },
    successUpdateShop: (state: ShopState, action) => {
      return {
        ...state,
        ...action.payload,
        updateShopStatus: { loading: false, success: true, error: false },
      };
    },
    errorUpdateShop: (state: ShopState, action) => {
      return {
        ...state,
        updateShopStatus: { loading: false, success: false, error: action.payload || true },
      };
    },
    resetShopStatus: (state: ShopState) => {
      return {
        ...state,
        addShopStatus: initialState.addShopStatus,
        removeShopStatus: initialState.removeShopStatus,
        updateShopStatus: initialState.updateShopStatus,
      };
    },
    resetShop: (state: ShopState) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const shopReducer = shopSlice.reducer;
export const shopActions = shopSlice.actions;
