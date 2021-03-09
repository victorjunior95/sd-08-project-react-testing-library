import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa componente <About />', () => {
  it('Testa a renderização da página About', () => {
    const { getByText } = renderWithRouter(<About />);
    const textOnScreen = getByText(/About Pokédex/i);
    expect(textOnScreen).toBeInTheDocument();
  });
  it('Teste que analiza se o componente apresenta dois parágrafos', () => {
    const { container } = renderWithRouter(<About />);
    const paragrafos = container.querySelectorAll('p');
    expect(paragrafos).toHaveLength(2);
  });
  it('Testa que analiza a renderização da imagem na Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(imageURL);
  });
});
