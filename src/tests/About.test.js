import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2 - About.test', () => {
  test('Caminho feliz', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const aboutPokedexPOne = screen.getByText(/this application simulates a pokédex/i);
    expect(aboutPokedexPOne).toBeInTheDocument();

    const aboutPokedexPTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(aboutPokedexPTwo).toBeInTheDocument();

    const headingAboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(headingAboutPokedex).toBeInTheDocument();

    const imgPokedex = document
      .querySelector('img[src="https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"]');
    expect(imgPokedex).toBeInTheDocument();
  });
});
