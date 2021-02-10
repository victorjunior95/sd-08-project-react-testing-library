import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Req 1 - Teste do App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('1 - Shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('2 - 3 Links on navbar', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const link = getAllByRole('link');

    expect(link[0].textContent).toBe('Home');
    expect(link[1].textContent).toBe('About');
    expect(link[2].textContent).toBe('Favorite Pokémons');
  });

  test('3 - Shows / when click on Home', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const targetBtn = getAllByRole('link')[0];

    expect(targetBtn.textContent).toBe('Home');
    fireEvent.click(targetBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('4 - Shows /about when click on About', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const targetBtn = getAllByRole('link')[1];

    expect(targetBtn.textContent).toBe('About');
    fireEvent.click(targetBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('5 - Shows /favorites when click on Favorite Pokémons', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const targetBtn = getAllByRole('link')[2];

    expect(targetBtn.textContent).toBe('Favorite Pokémons');
    fireEvent.click(targetBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('6 - 404 Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/blablabla');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
