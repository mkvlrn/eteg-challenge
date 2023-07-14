import {
  Button,
  ColorInput,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { FormValues, useJoeForm } from '#/frontend/components/form-state.js';

export function UserForm() {
  const { form, colors } = useJoeForm();

  const handleSubmit = async (values: FormValues) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });

    const data: { statusCode: number; code: string; message: string | string[] } =
      await response.json();
    if (response.ok) {
      console.log(data);
    } else if (data.code === 'VALIDATION_ERROR') {
      const { message } = data as { message: string[] };
      const nomeError = message.find((message_) => message_.startsWith('nome'));
      const emailError = message.find((message_) => message_.startsWith('email'));
      const cpfError = message.find((message_) => message_.startsWith('cpf'));
      const corFavoritaError = message.find((message_) => message_.startsWith('corFavorita'));
      const obsError = message.find((message_) => message_.startsWith('obs'));

      if (nomeError) form.setFieldError('nome', nomeError);
      if (emailError) form.setFieldError('email', emailError);
      if (cpfError) form.setFieldError('cpf', cpfError);
      if (corFavoritaError) form.setFieldError('corFavorita', corFavoritaError);
      if (obsError) form.setFieldError('obs', obsError);
    } else {
      console.error(data);
    }
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
              maxLength={11}
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
            <Textarea
              label='Observações'
              placeholder='Lorem ipsum'
              {...form.getInputProps('obs')}
            />
          </Stack>
          <Group mt='xl' grow>
            <Button type='submit'>
              <Text weight='bold' size='lg'>
                Cadastrar
              </Text>
            </Button>
            <Button type='reset' color='gray' onClick={form.reset} disabled={!form.isDirty()}>
              Limpar
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
