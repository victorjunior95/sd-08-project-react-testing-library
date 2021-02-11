import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste Requisito 5', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
      
    expect(getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    }));
  });
});
