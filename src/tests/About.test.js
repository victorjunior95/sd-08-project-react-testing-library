import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

// Será avaliado se o arquivo teste About.test.js contemplam 100% dos casos de uso criados pelo Stryker.
describe('About.js - the page contains:', () => {
  // Teste se a página contém as informações sobre a Pokédex.
  test('An h2 heading with the text About Pokédex', () => {
    // Teste se a página contém um heading h2 com o texto About Pokédex.
    const { getByRole } = render(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Two paragraphs with text about Pokédex', () => {
    const { getByText } = render(<About />);
    // Teste se a página contém dois parágrafos com texto sobre a Pokédex.
    expect(getByText(/This application simulates a Pokédex/i));
    expect(getByText(/One can filter Pokémons by type/i));
  });

  test('The image of a Pokédex', () => {
    const { getByAltText } = render(<About />);
    // Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.
    const image = getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(url);
  });
});
