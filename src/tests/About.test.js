import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('About component testing', () => {
  it('Checks whether to render text About Pokemon', () => {
    const { getByText } = renderWithRouter(<About />);
    const pageTitle = getByText(/About Pokédex/i);

    expect(pageTitle).toBeInTheDocument();
  });

  it('Checks whether the page renders 2 paragraphs with text about Pokedex', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('Checks whether to render image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toBe(imgURL);
  });
});
