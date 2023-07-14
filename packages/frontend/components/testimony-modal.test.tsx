import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { TestimonyModal } from '#/frontend/components/testimony-modal.jsx';

test('renders', () => {
  render(<TestimonyModal close={vi.fn()} opened />);

  const modalResult = screen.getByRole('dialog');
  const iframeResult = screen.getByTitle('YouTube video player');

  expect(modalResult).toBeInTheDocument();
  expect(modalResult).toHaveTextContent('Never');
  expect(iframeResult).toBeInTheDocument();
});
