import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the <App.js /> component', () => {
  it('should render a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render the Pokédex when the route is "/"', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('should have a fixed set of navigation links at the top of the page', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const navLinks = getAllByRole('link');
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('should redirected to the main page by clicking on the Home link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('should be redirected to the about page by clicking on the About link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('should be redirected to the favorite page by clicking on the Favorite link', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const findTitle = getAllByRole('heading');
    expect(findTitle[1]).toBeInTheDocument();
    expect(findTitle[1]).toHaveTextContent('Favorite pokémons');
  });

  it('should be redirected to the page Not Found if when the route is unknown', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/unknown-path');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
