import React from 'react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
// import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Pagina inicial', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: /More Details/i,
    });
    userEvent.click(link);
    const pikachuDetails = getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    const sumary = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    const sumaryText = getByText(/This intelligent Pokémon/i);
    expect(pikachuDetails).toBeInTheDocument();
    expect(sumary).toBeInTheDocument();
    expect(sumaryText).toBeInTheDocument();
  });
  it('Existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
      const link = getByRole('link', {
        name: /More Details/i,
      });
      userEvent.click(link);
      const pikachuDetails = getByRole('heading', {
        level: 2,
        name: /Game Locations of Pikachu/i,
      });

      const pikachuLocations = getAllByAltText(/Pikachu location/i);
      const favorite = getByText(/Pokémon favoritado/i);
      expect(favorite).toBeInTheDocument();
      expect(pikachuLocations[1]).toHaveAttribute('alt', 'Pikachu location');
      expect(pikachuLocations[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(pikachuDetails).toBeInTheDocument();
      expect(pikachuLocations.length).toBe(2);
    });
});
