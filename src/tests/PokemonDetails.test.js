import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1- As informações detalhadas devem ser mostradas na tela.', () => {
  it('Deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/pikachu details/i)).toBeInTheDocument();
  });
  it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/more details/i)).toBeNull();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/summary/i)).toBeInTheDocument();
  });
  it('Deve conter um resumo do Pokémon específico sendo visualizado.', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/this intelligent pokémon/i)).toBeInTheDocument();
  });
});
describe('2- Deve existir mapas contendo as localizações do pokémon.', () => {
  it('Devem ser exibidos todas as localizações e imagens', () => {
    const { queryByText, queryAllByAltText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/locations of pikachu/i)).toBeInTheDocument();
    const locations = queryAllByAltText(/pikachu location/i);
    expect(locations.length).toEqual(2);
    expect(locations[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
  });
});
describe('3- Deve ser possível adicionar e remover da lista de favoritos.', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/pokémon favoritado/i)).toBeInTheDocument();
  });
});
