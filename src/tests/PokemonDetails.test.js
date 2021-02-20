import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Req07 Teste Pokemon informações detalhadas.', () => {
  test('A página tem um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more detail/i));
    const details = screen.getByText(/pikachu details/i);
    expect(details).toBeInTheDocument();
  });
  test('Não existir o link de para os detalhes do Pokémon selecionado', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more detail/i));
    const moreDetails = screen.queryByText(/more detail/i);
    expect(moreDetails).toBeNull();
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary ', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more detail/i));
    const headingH2 = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
  test('parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more detail/i));
    const resume = screen.getByText(/This intelligent Pokémon/i);
    expect(resume).toBeInTheDocument();
  });
});

describe('Req07 Teste se existe os mapas contendo as localizações do pokémon', () => {
  test('Teste heading h2 texto Game Locations of <name> que é oPokémon exibido.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more detail/i));
    const headingH2 = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
  test('Teste dois mapas de localicação pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more detail/i));
    const map = screen.queryAllByAltText(/pikachu location/i);
    expect(map.length).toEqual(2);
    expect(map[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
  });
});

describe('Req07 Teste se o usuário pode favoritar um pokémon', () => {
  test('O label do checkbox deve conter o texto "Pokémon favoritado?"', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more detail/i));
    const checkbox = (screen.getByText(/Pokémon favoritado?/i));
    expect(checkbox).toBeInTheDocument();
  });
});
