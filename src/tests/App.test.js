import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('tests for App.js', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('verifies if there is 4 links', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const links = getAllByRole('link');
    const linksLength = 4;
    expect(links.length).toBe(linksLength);
  });

  it('verifies the texts of the 4 links', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByRole('link', { name: /Home/ });
    const aboutLink = getByRole('link', { name: /About/ });
    const favPokLink = getByRole('link', { name: /Favorite Pokémons/ });
    const detailsLink = getByRole('link', { name: /More details/ });
    const allLinks = [homeLink, aboutLink, favPokLink, detailsLink];
    allLinks.forEach((link) => expect(link).toBeInTheDocument());
    // expect(homeLink && aboutLink && favPokLink && detailsLink).toBeInTheDocument();
  });
});
