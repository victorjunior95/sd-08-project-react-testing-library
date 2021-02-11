import React from 'react';
import { Router } from 'react-router-dom';
import { creatMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = creatMemoryHistory();
  return ({
    ...render(<Router history={ history }>
      { component }
    </Router>),
    history,
  });
};

export default renderWithRouter;