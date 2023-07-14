import { useForm } from '@mantine/form';

type Color = 'VERMELHO' | 'LARANJA' | 'AMARELO' | 'VERDE' | 'AZUL' | 'ANIL' | 'VIOLETA';

const colors: { [key: string]: Color } = {
  '#e81416': 'VERMELHO',
  '#ffa500': 'LARANJA',
  '#faeb36': 'AMARELO',
  '#79c314': 'VERDE',
  '#487de7': 'AZUL',
  '#4b369d': 'ANIL',
  '#70369d': 'VIOLETA',
};

export interface FormValues {
  nome: string;
  email: string;
  cpf: string;
  corFavorita: string;
  obs: string;
}

export function useJoeForm() {
  const form = useForm<FormValues>({
    initialValues: {
      nome: '',
      email: '',
      cpf: '',
      corFavorita: '#e81416',
      obs: '',
    },

    transformValues: (values) => ({
      ...values,
      corFavorita: colors[values.corFavorita],
    }),
  });

  return { form, colors };
}
