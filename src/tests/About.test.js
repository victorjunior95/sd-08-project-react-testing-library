import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('req 2', () => {
  const { getByText, getByRole, getByAltText } = render(<About />);
  const title = getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  const text1 = getByText(
    'This application simulates a Pokédex,'
    + ' a digital encliclopedia containing all Pokémons',
  );
  const text2 = getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  const image = getByAltText('Pokédex');
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
