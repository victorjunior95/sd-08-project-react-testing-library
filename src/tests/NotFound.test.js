import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('test the NotFound component', () => {
  it('tests if the page contains a heading and an image reporting an error', () => {
    const history = createMemoryHistory();
    history.push('/some/bad/route');
    const { getByRole, getByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const heading = getByRole('heading', { level: 2 });
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch('Page requested not found');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
