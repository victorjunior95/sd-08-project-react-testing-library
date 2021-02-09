import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe.only('Testes do requisito 2', () => {
  it('renders a heading with the text `About Pokédex`', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('About Pokédex');
  });

  it('renders two paragraphs with a specific text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const firstParagraph = getByText(/This application/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = getByText(/One can/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('renders a img with a specific source', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const srcImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img');
    expect(image.src).toBe(srcImage);
  });
});
