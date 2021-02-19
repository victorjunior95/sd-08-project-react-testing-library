import React from 'react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

export default
test('Teste se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
  const { getByRole } = renderWithRouter(<About />);

  expect(getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  })).toBeInTheDocument();
});

describe('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);

    const xablau = container.querySelectorAll('p');

    expect(xablau.length).toBe(2);
  });
});

describe('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  it('testando se tem imagem na pagina', () => {
    const THE_URL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const { getByAltText } = renderWithRouter(<About />);
    const picuteAbout = getByAltText('Pokédex');
    expect(picuteAbout).toBeInTheDocument();
    expect(picuteAbout.src).toContain(THE_URL);
  });
});
