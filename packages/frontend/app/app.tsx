import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  List,
  rem,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconExternalLink, IconVideo } from '@tabler/icons-react';
import { useStyles } from '#/frontend/app/app.style.js';
import { UserForm } from '#/frontend/components/form.jsx';
import { TestimonyModal } from '#/frontend/components/testimony-modal.jsx';

export function App() {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container>
      <Center>
        <Text role='heading' mt='3rem' weight='900' style={{ fontSize: rem(80) }}>
          John Doe&apos;s Secret
        </Text>
      </Center>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>única</span> plataforma que você precisa
          </Title>
          <Text color='dimmed' mt='md'>
            Cadastre-se para ser um dos primeiros a ter acesso ao produto digital definitivo. Nada
            vai ser como antes. A mudança de paradigmas, mentes e corações está chegando.
          </Text>
          <List
            mt={30}
            spacing='sm'
            size='sm'
            icon={
              <ThemeIcon size={20} radius='xl'>
                <IconCheck size={rem(12)} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Extra sensorial</b> - transcenda o material e o mundano. Atinja o inalcalçável.
              Seja o inesperado.
            </List.Item>
            <List.Item>
              <b>Sem radicais livres</b> - compreensivo, porém simples de absorver. Nunca antes uma
              tecnologia tão revolucionária foi tão acessível.
            </List.Item>
            <List.Item>
              <b>Amigo dos animais</b> - e quando a convergência se tornar inevitável, você estará
              em boa companhia.
            </List.Item>
          </List>
          <Group mt={30}>
            <Button
              radius='xl'
              size='md'
              className={classes.control}
              rightIcon={<IconVideo />}
              onClick={open}
            >
              Depoimentos
            </Button>
            <Anchor href='https://github.com/mkvlrn/eteg-challenge' target='_blank'>
              <Button
                variant='default'
                radius='xl'
                size='md'
                className={classes.control}
                rightIcon={<IconExternalLink />}
              >
                Saiba mais
              </Button>
            </Anchor>
          </Group>
        </div>
        <UserForm />
      </div>
      <TestimonyModal opened={opened} close={close} />
    </Container>
  );
}
