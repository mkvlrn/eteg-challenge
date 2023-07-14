import { Button, ColorInput, Container, Paper, Stack, Textarea, TextInput } from '@mantine/core';
import { FormValues, useJoeForm } from '#/frontend/components/form-state.js';

export function UserForm() {
  const { form, colors } = useJoeForm();

  const handleSubmit = (values: FormValues) => {
    const body = { ...values, corFavorita: colors[values.corFavorita] };
    console.log(body);
  };

  return (
    <Container w='60rem'>
      <Paper withBorder shadow='md' p={25} radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing='xl'>
            <TextInput
              label='Nome completo'
              placeholder='Seu nome'
              {...form.getInputProps('nome')}
              withAsterisk
            />

            <TextInput
              label='Email'
              placeholder='seu@email.com.br'
              {...form.getInputProps('email')}
              withAsterisk
            />

            <TextInput
              label='CPF (somente números)'
              placeholder='000.000.000-00'
              {...form.getInputProps('cpf')}
              withAsterisk
            />

            <ColorInput
              label='Cor favorita'
              disallowInput
              withPicker={false}
              withEyeDropper={false}
              swatches={Object.keys(colors)}
              format='hex'
              closeOnColorSwatchClick
              {...form.getInputProps('corFavorita')}
              withAsterisk
            />
            <Textarea label='Observações' placeholder='Lorem ipsum' />
          </Stack>
          <Button type='submit' fullWidth mt='xl'>
            Cadastro antecipado
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
