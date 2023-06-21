import React from 'react';

import { Anchor, Group } from '@mantine/core';

function Header() {
  return (
    <header
      data-testid="todo-header"
      style={{ backgroundColor: '#1c7ed6', padding: '2rem 1rem' }}
    >
      <Group position="apart" grow>
        <Group>
          <Anchor color="white" size="xl" weight={500} href="/">
            Home
          </Anchor>
          <Anchor color="white" size="xl" weight={500} href="/settings">
            Settings
          </Anchor>
        </Group>
      </Group>
    </header>
  );
}

export default Header;
