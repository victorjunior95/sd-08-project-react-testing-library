import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('contains a fixed set of navigation links', () => {
  it('contains home link', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/home/i)).toBeInTheDocument();
  });
  it('contains about link', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/about/i)).toBeInTheDocument();
  });
  it('contains favorite pokémons link', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/favorite pokémons/i)).toBeInTheDocument();
  });
});
