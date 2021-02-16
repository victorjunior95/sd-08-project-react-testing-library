import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('About.js', () => {
  it('The page contains information about a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const informationAbout = getByText(/This application simulates a Pokédex/i);
    expect(informationAbout).toBeInTheDocument();
  });
  it('the page contains an h2 heading with the text About Pokédex',
    () => {
      const { getByRole } = renderWithRouter(<About />);
      const aboutTitle = getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      expect(aboutTitle).toBeInTheDocument();
    });
  it('the page contains two paragraphs with text about Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const keyWord = getAllByText(/Pokémons/i);
    const two = 2;
    expect(keyWord.length).toBe(two);
  });
  it('the page contains a specific image', () => {
    const { getByRole } = renderWithRouter(<About />);

    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
