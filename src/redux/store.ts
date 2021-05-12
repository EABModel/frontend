import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { userReducer } from './slices/userSlice';
import { modalReducer } from './slices/modalSlice';
import { catalogReducer } from './slices/catalogSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';

// Parts of the state you want to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'modal', 'catalog'],
};

// Add new reducers here
const RootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  catalog: catalogReducer,
});

const RootReducerPersistor = persistReducer(persistConfig, RootReducer);

// Export the store to use it in the app
export const store = createStore(RootReducerPersistor, composeWithDevTools(applyMiddleware(thunk)));

export const storePersistor = persistStore(store);

export type RootState = ReturnType<typeof RootReducerPersistor>;
