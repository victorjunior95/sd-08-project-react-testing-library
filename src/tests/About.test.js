import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testing About.js component, if the page contains', () => {
  it('information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
    expect(getByText(/this application simulates/i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons/i)).toBeInTheDocument();
  });

  it('an h2 heading with the text "About Pokédex".', () => {
    const { getByRole } = renderWithRouter(<About />);

    expect(getByRole('heading', { name: 'About Pokédex', level: 2 })).toBeInTheDocument();
  });

  it('two paragraphs with text about Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  it('a specific image', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(src);
  });
});
