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
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph[0]).toBeInTheDocument();
    expect(paragraph[0].textContent.includes('Pokédex'));
    expect(paragraph[1]).toBeInTheDocument();
    expect(paragraph[1].textContent.includes('Pokédex'));
  });
  it('should have a image of a Pokédex', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
