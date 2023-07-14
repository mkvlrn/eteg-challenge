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
import { useJoeForm } from '#/frontend/components/form-state.js';

export function UserForm() {
  const { form, colors, loading, submitForm } = useJoeForm();

  return (
    <Container w='60rem'>
      <Paper withBorder shadow='md' p={25} radius='md'>
        <form name='user-form' aria-label='user-form' onSubmit={form.onSubmit(submitForm)}>
          <Stack spacing='xl'>
            <TextInput
              label='Nome completo'
              placeholder='Seu nome'
              disabled={loading}
              {...form.getInputProps('nome')}
              withAsterisk
            />

            <TextInput
              label='Email'
              placeholder='seu@email.com.br'
              disabled={loading}
              {...form.getInputProps('email')}
              withAsterisk
            />

            <TextInput
              label='CPF (somente números)'
              placeholder='000.000.000-00'
              maxLength={11}
              disabled={loading}
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
              disabled={loading}
              {...form.getInputProps('corFavorita')}
              withAsterisk
            />
            <Textarea
              label='Observações'
              placeholder='Lorem ipsum'
              disabled={loading}
              {...form.getInputProps('obs')}
            />
          </Stack>
          <Group mt='xl' grow>
            <Button type='submit' loading={loading}>
              <Text weight='bold' size='lg'>
                Cadastrar
              </Text>
            </Button>
            <Button type='reset' color='gray' onClick={form.reset} disabled={loading}>
              Limpar
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
