import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('verifica heading e img na pagina About', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutOnly = getByText(/About Pokédex/i);
  expect(aboutOnly).toBeInTheDocument();

  const imgAbout = screen.getByRole('img', {
    alt: /Pokédex/i,
  });
  expect(imgAbout).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
