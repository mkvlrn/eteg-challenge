import { getServer } from '#/backend/api/server.js';

const server = await getServer();

await server.ready();
await server.listen({ port: process.env.PORT, host: '0.0.0.0' });

for await (const signal of ['SIGINT', 'SIGTERM', 'SIGUSR2']) {
  process.on(signal, async () => {
    await server.close();
    process.kill(process.pid, signal);
    process.exit(0);
  });
}
