import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { App } from '#/frontend/app/app.jsx';

test('renders', () => {
  render(<App />);

  const allHeadings = screen.getAllByRole('heading');
  const result = allHeadings[0];

  expect(result).toBeInTheDocument();
  expect(result).toHaveTextContent('John Doe');
});
