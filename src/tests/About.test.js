import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { About } from '../components';

describe('About Page', () => {
  it('Should render the text "About Pokédex"', () => {
    const { getByText } = renderWithRouter(<About />);

    const aboutTitle = getByText(/About Pokédex/i);

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Should contain two paragraphs descripting the pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const aboutParagraphs = container.querySelectorAll('p');
    expect(aboutParagraphs.length).toBe(2);
  });

  it('Should contain an image with the corresponding source', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const aboutImage = getByRole('img');

    expect(aboutImage.src).toBe(imageURL);
  });
});
