import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test the <About.js /> component', () => {
  it('should render a page with info about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should have a h2 heading with text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);

    expect(getByRole('heading', { name: 'About Pokédex' })).toBeInTheDocument();
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('should have 2 paragraphs about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText(/application simulates/i)).toBeInTheDocument();
    expect(getByText(/and see more details/i)).toBeInTheDocument();
  });

  it('should have an specific image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const imgLink = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src', imgLink);
  });
});
