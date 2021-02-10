import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getAllByRole, render, screen } from '@testing-library/react';
import About from '../components/About';
// import { RuleTester } from 'eslint';
import renderWithRouter from './renderWithRouter';

test('Testa se About traz informações sobre pokédex', () => {
  const { rend } = renderWithRouter(<About />);
  const cabecaH1 = screen.getByRole(
    'heading', {
      name: 'About Pokédex',
      level: 2,
    },
  );
  expect(cabecaH1).toBeInTheDocument();
});
/* renderizar app
dar um click em about
em seguida ver se veio o texto: 'About Pokédex' num h2. */
