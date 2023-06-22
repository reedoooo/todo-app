import React from 'react';
import { MantineProvider } from '@mantine/core';

import SettingsProvider from './Context/Settings';
import Todo from './Components/Todo';
import AuthProvider from './Context/Auth/authContext';

function App() {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: 'light',
        colors: {
          red: [
            '#FFCDD2',
            '#EF9A9A',
            '#E57373',
            '#EF5350',
            '#F44336',
            '#E53935',
            '#D32F2F',
            '#C62828',
            '#B71C1C',
            '#7F0000',
          ],
          blue: [
            '#E3F2FD',
            '#BBDEFB',
            '#90CAF9',
            '#64B5F6',
            '#42A5F5',
            '#2196F3',
            '#1E88E5',
            '#1976D2',
            '#1565C0',
            '#0D47A1',
          ],
          // Add more colors here...
        },
        shadows: {
          md: '1px 1px 3px rgba(0, 0, 0, .25)',
          xl: '5px 5px 3px rgba(0, 0, 0, .25)',
        },
        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: {
            h1: { fontSize: '2rem' },
            // Add more heading sizes here...
          },
        },
        // Add more theme properties here...
      }}
    >
      <SettingsProvider>
        <AuthProvider>
          <Todo />
        </AuthProvider>
      </SettingsProvider>
    </MantineProvider>
  );
}

export default App;
