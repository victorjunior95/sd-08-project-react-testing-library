import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testing the NotFound.js component if the page contains', () => {
  it('an h2 heading with the text "Page requested not found Crying emoji"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2 = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  it('an h2 heading with the text "Page requested not found Crying emoji"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const image = getByRole('img');

    expect(image).toBeInTheDocument();
  });
});
