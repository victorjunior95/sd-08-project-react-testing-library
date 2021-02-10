import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('tests the main component (App.js)', () => {
  it('tests that main page renders with the default url "/"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('tests if navigation links appear when page is rendered', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('tests routing of navigation links', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/About/i));
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Home/i));
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByRole('heading', { level: 2 })).toHaveTextContent(/Favorite pokémons/i);
  });

  it('tests routing of navigation links', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/random-string'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/page requested not found/i)).toBeInTheDocument();
  });
});
