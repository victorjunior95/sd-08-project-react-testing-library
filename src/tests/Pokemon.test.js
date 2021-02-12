import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const str = 'Pikachu sprite';

test('Testa pokemon encontrado por nome', () => {
  renderWithRouter(<App />);
  const idname = screen.getByTestId('pokemon-name');
  // console.log(idname.textContent);
  expect(idname.textContent).toBe('Pikachu');
});

test('Testa pokemon encontrado por tipo', () => {
  renderWithRouter(<App />);
  const idtipo = screen.getByTestId('pokemonType');
  // console.log(idtipo.textContent);
  expect(idtipo.textContent).toBe('Electric');
});

test('Testa pokemon encontrado por peso', () => {
  renderWithRouter(<App />);
  const idpeso = screen.getByTestId('pokemon-weight');
  // console.log(idpeso.textContent);
  expect(idpeso.textContent).toBe('Average weight: 6.0 kg');
});

test('Testa se existe detalhes ', () => {
  renderWithRouter(<App />);
  const idDetalhe = screen.getByRole(
    'link',
    {
      name: 'More details',
      href: '/pokemons/25',
    },
  );

  // console.log(idDetalhe.textContent);

  userEvent.click(idDetalhe);

  const txtDetalhe = screen.getByRole(
    'heading',
    {
      level: 2,
      name: 'Summary',
    },
  );

  expect(txtDetalhe).toBeInTheDocument();
});

test('Testa a imagem do pokemon', () => {
  renderWithRouter(<App />);
  const img = screen.getByRole(
    'img',
    {
      name: str,
    },
  );
  // wqqconsole.log(img);
  expect(img).toHaveProperty('alt', str);
});

test('Testa endreço da imagem do pokemon', () => {
  renderWithRouter(<App />);
  const img = screen.getByRole(
    'img',
    {
      name: str,
      alt: str,
    },
  );
  // console.log(img);
  expect(img).toHaveProperty('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Testa se é favorito ', () => {
  renderWithRouter(<App />);
  const idDetalhe = screen.getByRole(
    'link',
    {
      name: 'More details',
      href: '/pokemons/25',
    },
  );

  // console.log(idDetalhe.textContent);

  userEvent.click(idDetalhe);

  const labelFav = screen.getByText('Pokémon favoritado?');
  // console.log(labelFav);
  userEvent.click(labelFav);

  const imgFav = screen.getByRole(
    'img',
    {
      name: 'Pikachu is marked as favorite',
      class: 'favorite-icon',
      src: '/star-icon.svg',
    },
  );
  // console.log(imgFav);
  expect(imgFav).toBeInTheDocument();

  expect(imgFav.src).toContain('star-icon.svg');
});
