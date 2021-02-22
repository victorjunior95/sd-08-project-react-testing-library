import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('test example', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});
describe('Req I -  App.js Tests', () => {
  it(' 1.1 - Test  URL / path', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('1.2 - Test navigation links', () => {
    const { getByText } = renderWithRouter(<App />);
    const Home = getByText('Home');
    const About = getByText('About');
    const Favorite = getByText(/Favorite Pokémons/i);

    expect(Home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(Favorite).toBeInTheDocument();
  });

  it('1.3 - Test the URL / by clicking on the Home link ', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;

    userEvent.click(getByText('Home'));

    expect(pathname).toBe('/');
  });

  it(' 1.4 - Test  the URL / about clickes on the About link', () => {
    const { history, getByText } = renderWithRouter(<App />);

    userEvent.click(getByText('About'));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it(' 1.5 - Test  the URL /favorites by clicked on the Favorite Pokémon link', () => {
    const { history, getByText } = renderWithRouter(<App />);

    userEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it(' 1.6 - Test unknown URL. ', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/undefined');

    const notFound = getByText(/Page requested not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
