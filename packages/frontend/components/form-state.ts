import { useForm } from '@mantine/form';
import { Color } from '@prisma/client';

const colors: { [key: string]: Color } = {
  '#e81416': Color.VERMELHO,
  '#ffa500': Color.LARANJA,
  '#faeb36': Color.AMARELO,
  '#79c314': Color.VERDE,
  '#487de7': Color.AZUL,
  '#4b369d': Color.ANIL,
  '#70369d': Color.VIOLETA,
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
