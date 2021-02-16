import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory} from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(component) {
  const history = createBrowserHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history
  });
};
