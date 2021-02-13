import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';

import { About } from '../components';

describe('Tests <About /> component', () => {
  it('should render a h2 tag with the text `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('must contain two p tags describing the `Pokédex`', () => {
    const { getAllByTestId } = renderWithRouter(<About />);

    expect(getAllByTestId('about-pokedex').length).toBe(2);
  });

  it('must contain an specific image with the corresponding source', () => {
    const { getByRole } = renderWithRouter(<About />);

    expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
