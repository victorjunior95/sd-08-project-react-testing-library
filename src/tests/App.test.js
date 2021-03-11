import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test(
  'Pokédex é renderizada ao carregar a aplicação no caminho de URL /.',
  () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  },
);

test('Topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  const { getByRole } = renderWithRouter(<App />);

  const homeButton = getByRole('link', {
    name: /Home/i,
  });
  const aboutButton = getByRole('link', {
    name: /About/i,
  });
  const favButton = getByRole('link', {
    name: /Favorite Pokémons/i,
  });

  expect(homeButton).toBeInTheDocument();
  expect(aboutButton).toBeInTheDocument();
  expect(favButton).toBeInTheDocument();
});

test(
  'redirecionada para a página inicial',
  () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const homeButton = getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  },
);

test(
  'redirecionada para a página about',
  () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const aboutButton = getByRole('link', {
      name: /About/i,
    });
    userEvent.click(aboutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  },
);

test(
  'redirecionada para a página favoritos',
  () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const favButton = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  },
);

test(
  'redirecionada para a página de erro',
  () => {
    const { getByText } = renderWithRouter(<App />, { route: '/some/bad/route' });
    const notFoundText = getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  },
);
