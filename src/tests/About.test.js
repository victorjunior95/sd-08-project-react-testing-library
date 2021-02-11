import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import About from '../components/About';
// import { RuleTester } from 'eslint';
import renderWithRouter from './renderWithRouter';

test('Testa se About traz informações sobre pokédex', () => {
  renderWithRouter(<About />);
  const cabecaH = screen.getByRole(
    'heading', {
      name: 'About Pokédex',
      level: 2,
    },
  );
  expect(cabecaH).toBeInTheDocument();
});
test('Testa se About traz Paragrafo sobre pokédex', () => {
  renderWithRouter(<About />);
  const paragrafs = screen.getByText(/This application/i);
  expect(paragrafs).toBeInTheDocument();
});
test('Testa se About traz segundo Paragrafo sobre pokédex', () => {
  renderWithRouter(<About />);
  const paragrafs2 = screen.getByText(/One can filter Pokémons by type/i);
  expect(paragrafs2).toBeInTheDocument();
});

test('testa se tem uma imagem da pokédex', () => {
  renderWithRouter(<About />);
  const deximag = screen.getByAltText(
    'Pokédex', {
      src: 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    },
  );

  expect(deximag).toBeInTheDocument();
});

test('testa SRC imagem da pokédex', () => {
  renderWithRouter(<About />);
  const dximag = screen.getByAltText('Pokédex');
  const srcImg = dximag.src;

  expect(dximag.src).toBe(srcImg);
});

/* renderizar app
dar um click em about
em seguida ver se veio o texto: 'About Pokédex' num h2. */
