import { createStore, combineReducers, compose } from 'redux';
import { userReducer } from './reducers/UserReducer';


// Boilerplate code needed for visualizing redux dev tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Add new reducers here
const reducers = combineReducers({
  user: userReducer,
});

// Export the store to use it in the app
export const store = createStore(
  reducers,
  composeEnhancers(),
);
