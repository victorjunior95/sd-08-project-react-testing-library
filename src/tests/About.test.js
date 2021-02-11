import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('About tests', () => {
  it('Verifies if the page contains the text /About Pokédex/', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    const pokeInfo = getByRole('heading', { level: 2 });
    expect(pokeInfo).toHaveTextContent('About Pokédex');
  });
  it('Verifies if there are 2 paragraphs', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    const firstparagraph = getByText(/This application simulates a Pokédex/i);
    expect(firstparagraph).toBeInTheDocument();
    const secondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Verifies if there is a specific image on the page', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
