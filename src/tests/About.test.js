import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Tests About.test.js', () => {
  let renderedScreen;
  beforeEach(() => {
    renderedScreen = render(<About />);
  });

  test('Tests Pokédex Info', () => {
    ['This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons',
    'One can filter Pokémons by type, '
    + 'and see more details for each one of them'].forEach((re) => {
      expect(screen.getByText(re)).toBeInTheDocument();
    });
  });

  test('Tests Heading', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Tests Two Paragraphs', () => {
    const { container } = renderedScreen;
    expect(Array.from(container.querySelectorAll('p')).length).toBe(2);
  });
});
