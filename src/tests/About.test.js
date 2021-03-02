import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';

import About from '../components/About';

test('Deve verificar o que está contido em About', () => {
  const { getByRole, getAllByTestId, getByAltText } = renderWithRouter(<About />);

  const aboutHeading = getByRole('heading', {
    level: 2,
  });
  expect(aboutHeading).toHaveTextContent('About Pokédex');

  const aboutImg = getByAltText(/Pokédex/i);
  expect(aboutImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
