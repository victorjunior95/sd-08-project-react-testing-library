import React from 'react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

// const textAbout = `This application simulates a Pokédex, a digital encyclopedia containing all Pokémons
// One can filter Pokémons by type, and see more details for each one of them`;
describe('Componente About', () => {
  it('info', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2Heading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    const image = getByRole('img');
    expect(h2Heading).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
