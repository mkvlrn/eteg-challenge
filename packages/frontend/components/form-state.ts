import { useForm, UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

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

function setErrors(
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>,
  messages: string[],
) {
  for (const [key] of Object.entries(form.values)) {
    const errorMessage = messages.find((message) => message.startsWith(key));
    if (errorMessage) form.setFieldError(key, errorMessage);
  }

  if (messages.length > 0)
    notifications.show({
      title: 'Erro de validação no formulário (VALIDATION_ERROR)',
      message: 'Corrija os campos indicados e tente novamente.',
      color: 'red',
    });
}

export function useJoeForm() {
  const [loading, setLoading] = useState(false);
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

  const submitForm = async (values: FormValues) => {
    setLoading(true);
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });

    const data: { statusCode: number; code: string; message: string | string[] } =
      await response.json();
    if (response.ok) {
      notifications.show({
        title: 'Cadastro realizado com sucesso!',
        message: 'Em breve entraremos em contato com mais informações.',
        color: 'green',
      });
      form.reset();
    } else if (data.code === 'VALIDATION_ERROR') {
      setErrors(form, data.message as string[]);
    } else {
      notifications.show({
        title: `Erro ao enviar formulário (${data.code})`,
        message: data.message as string,
        color: 'red',
      });
    }

    setLoading(false);
  };

  return { form, colors, loading, submitForm };
}
