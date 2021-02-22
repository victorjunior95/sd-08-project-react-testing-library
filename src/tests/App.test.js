import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Testando se a pagína principal renderiza na url `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testando se os links aparecem na NavBar', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(getByRole('link', { name: /about/i })).toBeInTheDocument();
  expect(getByRole('link', { name: /favorite pokémons/i })).toBeInTheDocument();
});
