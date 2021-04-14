import React from 'react';
import { render } from '@testing-library/react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
import { App } from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
