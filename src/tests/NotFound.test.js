import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders 404 not found page', () => {
  const { getByText, getByAltText } = render(
    <MemoryRouter initialEntries={ ['/users'] }>
      <Route path="/users">

        <App />
      </Route>
    </MemoryRouter>,
  );

  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();

  const imgNF = getByAltText('Pikachu crying because the page requested was not found');
  expect(imgNF.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
