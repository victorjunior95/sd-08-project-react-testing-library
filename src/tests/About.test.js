import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

test('renders a about page', () => {
  const history = createMemoryHistory();
  const { getByText, container, getByAltText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const linkToAbout = getByText(/About/i);

  fireEvent.click(linkToAbout);
  expect(history.location.pathname).toBe('/about');

  const aboutPokedex = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(aboutPokedex).toBeInTheDocument();

  const allParagraph = container.getElementsByTagName('p');
  expect(allParagraph.length).toBe(2);

  const dexImg = getByAltText('Pokédex');
  expect(dexImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
