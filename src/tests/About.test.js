import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('checks if About page loads everything correctly', () => {
  test('tests if page has an h2 heading with the text About Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('tests if there are two paragraphs', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphs = getAllByTestId('paragraph');
    expect(paragraphs.length).toBe(2);
  });

  test('tests if the page contains the correct image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
