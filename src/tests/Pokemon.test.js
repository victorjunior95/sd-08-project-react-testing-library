import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('test the Pokemon component', () => {
  it('Has all the required elements', () => {
    const history = createMemoryHistory();
    history.push('/');
    const { getByRole, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonName.innerHTML).toMatch('Pikachu');
    expect(pokemonType.innerHTML).toMatch('Electric');
    expect(pokemonWeight.innerHTML).toMatch('Average weight: 6.0 kg');
    expect(pokemonImage.src).toMatch('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Has all the links routes working properly', () => {
    const history = createMemoryHistory();
    history.push('/');
    const { getByText, getByRole, getByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const detailsLink = getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const detailsText = getByText('Pikachu Details');
    expect(detailsText).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    userEvent.click(checkbox);
    const star = getByAltText('Pikachu is marked as favorite');
    expect(star.src).toMatch('/star-icon.svg');
    expect(star).toBeInTheDocument();
  });
});
