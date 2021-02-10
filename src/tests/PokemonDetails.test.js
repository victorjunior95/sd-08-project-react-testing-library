import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 7 - PokemonDetails.test', () => {
  test('Teste feliz', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const pikachuHeading = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(pikachuHeading).toBeInTheDocument();

    const detailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeNull();

    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summaryText).toBeInTheDocument();

    const pikachuDescription = screen
      .getByText(/this intelligent pokémon roasts hard berries with electricity/i);
    expect(pikachuDescription).toBeInTheDocument();

    const locationHeading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(locationHeading).toBeInTheDocument();

    const locationQuantity = screen.getAllByRole('img', {
      name: /pikachu location/i,
    }).length;
    expect(locationQuantity).toBe(2);

    const locationImageName = screen.getAllByRole('img', {
      name: /pikachu location/i,
    })[0];
    expect(locationImageName).toBeInTheDocument();

    const locationImageSrc = document.querySelector('img[src="https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png"]');
    expect(locationImageSrc).toBeInTheDocument();

    const favoritePikachu = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePikachu);

    const starImageAlt = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starImageAlt).toBeInTheDocument();
  });
});
