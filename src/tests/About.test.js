import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verifica se renderiza informação sobre `Pokédex`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText('About');

  fireEvent.click(linkAbout);
  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('Verifica se a página contém um heading h2 com o texto "About Pokédex"', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const linkAbout = getByText('About');

  fireEvent.click(linkAbout);

  const titulo = getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });

  expect(titulo).toBeInTheDocument();
});

test('Verifica se a página contém 2 parágrafos', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkAbout = getByText('About');

  fireEvent.click(linkAbout);
  const paragraph = document.querySelectorAll('p');

  expect(paragraph.length).toBe(2);
});

test('Verifica se a página contém uma imagem', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const linkAbout = getByText('About');

  fireEvent.click(linkAbout);

  const image = getByRole('img', {
    name: 'Pokédex',
  });

  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
