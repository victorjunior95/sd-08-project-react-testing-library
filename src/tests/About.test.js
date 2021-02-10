import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('About main page', () => {
  it('should have a h2 with the text: `About Pokédex`', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('About Pokédex');
  });
  it('should have two paragraphs with Pokédex information', () => {
    const { getByTestId } = render(<About />);
    const firstParagraph = getByTestId('first-paragraph');
    expect(firstParagraph).toBeInTheDocument();
    expect(firstParagraph.textContent.includes('Pokédex'));
    const secondParagraph = getByTestId('second-paragraph');
    expect(secondParagraph).toBeInTheDocument();
    expect(secondParagraph.textContent.includes('Pokédex'));
  });
  it('should have a image of a Pokédex', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
