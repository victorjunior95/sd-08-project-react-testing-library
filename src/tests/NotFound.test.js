import React from 'react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('Test component NotFound', () => {
  it('should have an h2 with the text "Page request not found"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/page/not/found');
    const headingPageNotFound = getByRole('heading', { level: 2 });
    expect(headingPageNotFound).toHaveTextContent('Page requested not found 😭');
  });

  it('should have an image', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/page/not/found');
    const image = getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
