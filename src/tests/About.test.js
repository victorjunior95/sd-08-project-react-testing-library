import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes no About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutPage = getByText(/About Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    }));
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const primeiroP = getByText(/This application simulates a Pokédex/i);
    expect(primeiroP).toBeInTheDocument();

    const segundoP = getByText(/One can filter Pokémons by type/i);
    expect(segundoP).toBeInTheDocument();
  });
  // test('Teste se a página contém as informações sobre a Pokédex', () => {
  //     const { getByText } = renderWithRouter(<App />);
  //     const pokedexInfo = getByText(/About Pokédex/i);
  //     expect(pokedexInfo).toBeInTheDocument();
  // });
});
