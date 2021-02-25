import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources };
};

test('renders a reading with the text `About Pokédex`', () => {
  const { getByText } = renderPath('/about');
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('renders a specific image', () => {
  const { getByRole } = renderPath('/about');
  const image = getByRole('img');
  expect(image.src).toEqual('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
