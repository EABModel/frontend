import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from './reducers/UserReducer';
import thunk from 'redux-thunk';
import LogInReducer from './reducers/LogInReducer';

// Boilerplate code needed for visualizing redux dev tools
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// };
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Add new reducers here
const RootReducer = combineReducers({
  user: userReducer,
  logIn: LogInReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

// Export the store to use it in the app
export const store = createStore(
  RootReducer,
  applyMiddleware(thunk),
);
