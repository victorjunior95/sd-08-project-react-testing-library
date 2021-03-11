import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testando se a aplicação renderiza o App.js na rota \'/\'', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const { pathname } = history.location;

  expect(pathname).toBe('/');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
