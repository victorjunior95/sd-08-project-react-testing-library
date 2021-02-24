import React from 'react';
// import {  } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('testa página about', () => {
  const { getByAltText, getByText } = renderWithRouter(<About />);
  const img = getByAltText('Pokédex');
  const about = getByText('About Pokédex');

  expect(about).toBeInTheDocument();
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
