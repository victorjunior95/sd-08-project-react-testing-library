import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4 - NotFound.test', () => {
  test('Teste feliz', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/some-route');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found crying emoji/i,
    });
    expect(notFound).toBeInTheDocument();

    const imgPokedex = document
      .querySelector('img[src="https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"]');
    expect(imgPokedex).toBeInTheDocument();
  });
});
