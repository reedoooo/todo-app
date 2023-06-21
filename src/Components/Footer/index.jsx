import React from 'react';
import { Paper, Text, Grid, Container, Center } from '@mantine/core';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Paper padding="md" style={{ backgroundColor: 'blue' }}>
      <Container>
        <Center style={{ color: 'white' }}>
          <Grid gutter="xs" justify="center">
            <Text align="center" size="sm">
              © {year} Reed Vogt. All Rights Reserved.
            </Text>
            <Text align="center" size="sm">
              Author of the Site: Reed Vogt
            </Text>
            <Text align="center" size="sm">
              Email:{' '}
              <a href="mailto:reed.vogt@example.com" style={{ color: 'white' }}>
                reed.vogt@example.com
              </a>
            </Text>
            <Text align="center" size="sm">
              Address: 2222 e street, Seattle, Wa, U.S.
            </Text>
          </Grid>
        </Center>
      </Container>
    </Paper>
  );
}

export default Footer;
