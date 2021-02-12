import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWitheRouter';

import { FavoritePokemons } from '../components';
import App from '../App';

describe('Favorite Pokémons Test', () => {
  it('verifies if no card should be shown if there are no favorites', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    userEvent.click(details);
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toEqual(false);

    const fav = getByText(/Favorite Pokémons/i);
    userEvent.click(fav);

    const lastVerifier = getByText('No favorite pokemon found');
    expect(lastVerifier).toBeInTheDocument();
  });
  it('Verifies if the user has no favorite Pokemon by showing the correct text', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const correctText = getByText('No favorite pokemon found');
    expect(correctText).toBeInTheDocument();
  });

  it('verifies if All the favorite Pokémons are in the document', () => {
    const { getByText } = renderWithRouter(<App />);
    const fire = getByText('Fire');
    const moreDetails = getByText('More details');

    userEvent.click(fire);
    userEvent.click(moreDetails);

    const charmander = getByText(/The flame on its tail shows the strength/i);
    expect(charmander).toBeInTheDocument();

    const favorite = getByText('Pokémon favoritado?');
    const favoriteLink = getByText('Favorite Pokémons');

    userEvent.click(favorite);
    userEvent.click(favoriteLink);

    const verificationText = getByText('Average weight: 8.5 kg');
    expect(verificationText).toBeInTheDocument();

    const home = getByText('Home');
    userEvent.click(home);

    const homeVerification = getByText('Encountered pokémons');

    expect(homeVerification).toBeInTheDocument();

    const bug = getByText('Bug');
    const moreDetails2 = getByText('More details');
    userEvent.click(bug);
    userEvent.click(moreDetails2);

    const caterpie = getByText(/Caterpie Details/i);
    expect(caterpie).toBeInTheDocument();

    const favorite2 = getByText('Pokémon favoritado?');
    const favoriteLink2 = getByText('Favorite Pokémons');

    userEvent.click(favorite2);
    userEvent.click(favoriteLink2);

    const verificationText2 = getByText('Average weight: 2.9 kg');
    expect(verificationText2).toBeInTheDocument();
  });
});
