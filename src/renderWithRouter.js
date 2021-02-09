import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistoty } from 'history';
import { reder, render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistoty();
  return ({
    ...render(<Router history={history}>{component}</Router>, history,)
  });
};

export default renderWithRouter;
