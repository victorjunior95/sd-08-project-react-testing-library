import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe.only('Testes do requisito 4', () => {
  it('renders a heading with the text `Page requested not found`', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Page requested not found 😭 ');
  });

  it('renders a img with a specific source', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getAllByRole('img');
    expect(image[1].src).toBe(srcImage);
  });
});
