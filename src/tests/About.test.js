import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente ´<About>´', () => {
  test('Se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const text = getByText('About Pokédex');
    expect(text).toBeInTheDocument();
  });
  test('se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    const { getByRole } = render(<About />);
    const selectHead = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(selectHead).toBeInTheDocument();
  });
  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const NParagraph = container.querySelectorAll('p');
    expect(NParagraph.length).toBe(2);
  });
  test('Se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByAltText } = render(<About />);
    const selectImg = getByAltText('Pokédex');
    expect(selectImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
