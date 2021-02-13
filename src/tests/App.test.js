import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests <App.js /> component', () => {
  it('should render a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('should render the home page in the root path', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('should render a fixed navigation bar at the top of the homepage', () => {
    const { getByText } = renderWithRouter(<App />);

    const links = ['Home', 'About', 'Favorite Pokémons'];

    const handleCheckLinkNames = (array) => {
      array.map((index) => expect(getByText(index)).toBeInTheDocument());
    };

    handleCheckLinkNames(links);
  });

  it('should redirect to the root path when "Home" link is accessed', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;

    userEvent.click(getByText('Home'));
    expect(pathname).toBe('/');
  });

  it('should redirect to "/about" path when "About" link is accessed', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('About'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('should redirect to "/favorites" path when "Favorite Pokémons" link is accessed',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      userEvent.click(getByText('Favorite Pokémons'));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

  it('should render "Not Found" component when user types an unavailable path', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/not-found');
    const notFoundText = getByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
