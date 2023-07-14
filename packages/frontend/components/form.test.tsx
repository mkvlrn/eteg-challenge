import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UserForm } from '#/frontend/components/form.jsx';

test('renders', () => {
  render(<UserForm />);

  const result = screen.getByRole('form');

  expect(result).toBeInTheDocument();
});
