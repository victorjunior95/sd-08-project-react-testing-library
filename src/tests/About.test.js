import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Testing About page', () => {
  test('page contains info about Pokedex', () => {
    const { getByText, history } = renderWithRouter(<About />);

    history.push('/about');

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const infoAbout = getByText(/About Pokédex/i);
    expect(infoAbout).toBeInTheDocument();
  });

  test('page contains a tag "h2" with text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('page contains two paragraphs with text about pokedex', () => {
    const { container } = renderWithRouter(<About />);

    const paragraph = container.getElementsByTagName('p');
    const lenthParagraph = 2;

    expect(paragraph.length).toBe(lenthParagraph);
  });

  test('page contains image of one pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const imgSource = getByRole('img');

    expect(imgSource.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
