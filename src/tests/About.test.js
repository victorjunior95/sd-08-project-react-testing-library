import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa componente <About />', () => {
  it('Testa se a pagina `About` Renderiza corretamente', () => {
    const { getByText } = renderWithRouter(<About />);
    const textOnScreen = getByText(/About Pokédex/i);
    expect(textOnScreen).toBeInTheDocument();
  });

  it('Testa se o componente apresenta dois parágrafos', () => {
    const { container } = renderWithRouter(<About />);
    const paragrafos = container.querySelectorAll('p');
    expect(paragrafos).toHaveLength(2);
  });

  it('Testa se a imgagem da Pokedex Renderiza', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(imageURL);
  });
});
