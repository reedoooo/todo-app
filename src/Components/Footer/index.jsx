import React from 'react';
import { Paper, Text, Col, Container, Center, Grid } from '@mantine/core';
import { RiMailSendLine } from 'react-icons/ri';
import { FiMapPin } from 'react-icons/fi';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Paper padding="md" style={{ backgroundColor: '#1c7ed6' }}>
      <Container>
        <Center style={{ color: 'white' }}>
          <Grid gutter="xs" justify="center">
            <Col span={12}>
              <Text color="white" align="center" size="sm">
                © {year} Reed Vogt. All Rights Reserved.
              </Text>
            </Col>
            <Col span={12}>
              <Text color="white" align="center" size="sm">
                Author of the Site: Reed Vogt
              </Text>
            </Col>
            <Col span={12}>
              <Text color="white" align="center" size="sm">
                <RiMailSendLine /> Email:{' '}
                <a
                  href="mailto:reed.vogt@example.com"
                  style={{ color: 'white' }}
                >
                  reed.vogt@example.com
                </a>
              </Text>
            </Col>
            <Col span={12}>
              <Text color="white" align="center" size="sm">
                <FiMapPin /> Address: 2222 e street, Seattle, Wa, U.S.
              </Text>
            </Col>
          </Grid>
        </Center>
      </Container>
    </Paper>
  );
}

export default Footer;
