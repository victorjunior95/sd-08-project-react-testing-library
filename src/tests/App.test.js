import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests the main component (App.js)', () => {
  it('tests that main page renders with the default url "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);

    expect(heading).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('tests if navigation links appear when page is rendered', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('tests routing of navigation links', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Home/i));
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Favorite pokémons/i);
  });

  it('tests routing to page not found', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/random-string' });
    expect(getByText(/page requested not found/i)).toBeInTheDocument();
  });
});
