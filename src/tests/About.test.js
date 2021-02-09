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
    const { getByTestId, getByText } = renderWithRouter(<About />);

    const paragraph1 = getByTestId('paragraph-about-1');
    expect(paragraph1).toBeInTheDocument();
    expect(
      getByText(
        'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons',
        paragraph1,
      ),
    )
      .toBeTruthy();
  });

  it('testando o segundo paragrafo', () => {
    const { getByTestId, getByText } = renderWithRouter(<About />);

    const paragraph2 = getByTestId('paragraph-about-1');
    expect(paragraph2).toBeInTheDocument();
    expect(
      getByText(
        'One can filter Pokémons by type, and see more details for each one of them',
        paragraph2,
      ),
    )
      .toBeTruthy();
  });
});

describe('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  it('testando se tem imagem na pagina', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const picuteAbout = getByAltText('Pokédex');
    expect(picuteAbout).toBeInTheDocument();
    expect(getByAltText('Pokédex', picuteAbout)).toBeTruthy();
  });
});
