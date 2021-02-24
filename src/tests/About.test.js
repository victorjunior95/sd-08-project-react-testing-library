import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Tests About', () => {
  const { getByText, getByRole, getByAltText } = render(<About />);
  const phrasePartOne = 'This application simulates a Pokédex, ';
  const phrasePartTwo = 'a digital encliclopedia containing all Pokémons';
  expect(getByText(phrasePartOne + phrasePartTwo)).toBeInTheDocument();

  const secondLine = getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  expect(secondLine).toBeInTheDocument();

  const title = getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(title).toBeInTheDocument();

  const image = getByAltText('Pokédex');

  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
