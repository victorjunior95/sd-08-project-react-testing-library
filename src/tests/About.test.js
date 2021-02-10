import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const ROUTE = { route: '/about' };

describe('Tests "About" page', () => {
  it('renders a subheading with the text `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />, ROUTE);

    const subHeading = getByText(/About Pokédex/i);
    expect(subHeading).toBeInTheDocument();
  });

  it('has information about pokedex', () => {
    const { getByText } = renderWithRouter(<App />, ROUTE);

    const firstInfo = new RegExp('This application simulates a Pokédex, '
      + 'a digital encl?[iy]clopedia containing all Pokémons', 'i');
    const secondInfo = 'One can filter Pokémons by type, and see '
      + 'more details for each one of them';

    expect([...document.querySelectorAll('p')].length).toBe(2);
    expect(getByText(firstInfo).tagName).toBe('P');
    expect(getByText(secondInfo).tagName).toBe('P');
  });

  it('renders an image of the pokédex', () => {
    const { getByAltText } = renderWithRouter(<App />, ROUTE);

    const pokedexImage = getByAltText('Pokédex');
    expect(pokedexImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
