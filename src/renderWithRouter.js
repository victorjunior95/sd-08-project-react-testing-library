import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router';

function renderWithRouter(component) {
  const history = createMemoryHistory()
  return (
    {
      ...render(<Router history={history}>{component}</Router>), history
    }
  );
}

export default renderWithRouter;