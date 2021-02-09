import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('Se a página contém as informações sobre a Pokédex', () => {
  const { history } = renderWithRouter(<App />);
  const navLinkAbout = screen.getByText('About');
  fireEvent.click(navLinkAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<App />);
  const navLinkAbout = screen.getByText('About');
  fireEvent.click(navLinkAbout);

  const headingText = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(headingText).toBeInTheDocument();
});

test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<App />);
  const navLinkAbout = screen.getByText('About');
  fireEvent.click(navLinkAbout);

  const p1 = 'This application simulates a Pokédex, ';
  const p2 = 'a digital encliclopedia containing all Pokémons';
  const paragraphText1 = screen.getByText(`${p1}${p2}`);
  expect(paragraphText1).toBeInTheDocument();

  const p3 = 'One can filter Pokémons by type, ';
  const p4 = 'and see more details for each one of them';
  const paragraphText2 = screen.getByText(`${p3}${p4}`);
  expect(paragraphText2).toBeInTheDocument();
});

test('Se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<App />);
  const navLinkAbout = screen.getByText('About');
  fireEvent.click(navLinkAbout);

  const imagem = screen.getByRole('img', {
    name: 'Pokédex',
  });
  expect(imagem.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
