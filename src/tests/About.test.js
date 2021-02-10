import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('About component test: the page must contain information about Pokédex', () => {
  it('The about page should contain an h2 heading with the text About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(heading).toBeInTheDocument();
  });

  it('The about page should contain two paragraphs with text about Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const paragraph = container.querySelectorAll('p');

    expect(paragraph.length).toBe(2);
  });

  it('The about page should contain a Pokédex image with the following link: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img', {
      name: 'Pokédex',
    });
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image.src).toBe(src);
  });
});
