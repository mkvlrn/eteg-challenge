import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    async function getHealthy() {
      const response = await fetch('/api/healthcheck');
      if (!response.ok) {
        throw new Error('Failed to get health');
      }

      const { healthy } = await response.json();

      console.log('healthy', healthy);
    }

    getHealthy();
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}
