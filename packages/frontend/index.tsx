import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '#/frontend/app/app.jsx';

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(
  <StrictMode>
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <App />
    </MantineProvider>
  </StrictMode>,
);
