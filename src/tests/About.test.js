import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Teste o componente <About.js />', () => {
  test('se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    expect(getByText(/This application simulates a Pokédex/i));
  });

  test('se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    expect(getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeDefined();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  test('se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img', {
      name: /pokédex/i,
    });
    const http = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toHaveAttribute('src', http);
  });
});
