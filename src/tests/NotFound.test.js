import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { NotFound } from '../components';

describe('NotFound Test', () => {
  it('Verifies if the element is a <h2> and has the correct text', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={ ['/XABLAU'] }>
        <App />
      </MemoryRouter>,
    );
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    const text = getByText('Page requested not found');
    expect(text).toBeInTheDocument();
  });

  it('verifies if there is the correct image', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <NotFound />
      </MemoryRouter>,
    );
    const img = getAllByRole('img')[1];
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
