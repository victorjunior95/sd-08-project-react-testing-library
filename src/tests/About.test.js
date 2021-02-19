import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('req02 Teste e a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const headingH2 = screen.getByRole('heading', {
    name: /About Pokédex/i,
    level: 2,
  });
  expect(headingH2).toBeInTheDocument();
});

// test('Testa se About traz informações sobre pokédex', () => {
//   renderWithRouter(<About />);
//   const cabecaH = screen.getByRole(
//     'heading', {
//       name: 'About Pokédex',
//       level: 2,
//     },
//   );
//   expect(cabecaH).toBeInTheDocument();
// });