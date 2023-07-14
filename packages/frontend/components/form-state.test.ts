import * as mantineForm from '@mantine/form';
import * as react from 'react';
import { expect, test, vi } from 'vitest';
import { useJoeForm } from '#/frontend/components/form-state.js';

vi.mock('react', () => ({ useState: () => [{}, () => {}] }));

test('is defined', async () => {
  vi.spyOn(react, 'useState').mockReturnValueOnce([{}, () => {}] as any);
  vi.spyOn(mantineForm, 'useForm').mockReturnValueOnce({} as any);

  const result = useJoeForm();

  expect(result).toBeDefined();
});
