import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import modalReducer from './slices/modalSlice';
import { userReducer } from './slices/userSlice';
import { authReducer } from './slices/authSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';

// Parts of the state you want to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'auth', 'modal'],
};

// Add new reducers here
const RootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  modal: modalReducer,
});

const RootReducerPersistor = persistReducer(persistConfig, RootReducer);

// Export the store to use it in the app
export const store = createStore(
  RootReducerPersistor,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
);

export const storePersistor = persistStore(store);

export type RootState = ReturnType<typeof RootReducerPersistor>;
