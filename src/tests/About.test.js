import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const inforPokedex = getByText(/This application simulates a Pokédex/i);
    expect(inforPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const aboutPokedex = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);

    const paragraph = container.querySelectorAll('p');
    expect(paragraph[0].value).toBe();
    expect(paragraph[1].value).toBe();
    expect(paragraph.length).toBe(2);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);

    const imgPokedex = getByRole('img', {
      name: /Pokédex/i,
    });
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
