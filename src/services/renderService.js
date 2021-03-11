import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderService = (component) => {
  const historyOfPokemons = createMemoryHistory();
  return {
    ...render(
      <Router history={ historyOfPokemons }>
        {component}
      </Router>,
    ),
    history,
  };
};

export default renderService;
