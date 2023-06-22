import React from 'react';
import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  CardSection,
  Container,
} from '@mantine/core';
import Auth from '../Auth';

const ListItem = ({ item, deleteItem, toggleComplete }) => {
  const task = item.task[0]; // simplifying access to the task data

  if (!task) {
    return null; // or you can return a placeholder or a loading spinner
  }

  const { status, name, description, difficulty, _id } = task;

  return (
    <Card shadow="sm" radius="md" withBorder>
      <Card.Section withBorder>
        <Group
          className="listItemHeader"
          position="apart"
          style={{ paddingLeft: '1rem' }}
        >
          <Group spacing="xl">
            <Badge color={status ? 'red' : 'green'} variant="filled">
              {status ? 'Complete' : 'Pending'}
            </Badge>
            <Text size="xl" color="blue" fw={700}>
              {name}
            </Text>
          </Group>
          <Auth capability="delete">
            <Button color="red" size="xs" onClick={() => deleteItem(_id)}>
              X
            </Button>
          </Auth>
        </Group>
      </Card.Section>

      <Card.Section withBorder>
        <Container size="97.5%" px={0}>
          <Text>{description}</Text>
          <Text align="right">Difficulty: {difficulty}</Text>
        </Container>
      </Card.Section>
      <CardSection>
        <Group position="right">
          <Auth capability="update">
            <Button onClick={() => toggleComplete(_id)}>Complete</Button>
          </Auth>
        </Group>
      </CardSection>
    </Card>
  );
};

export default ListItem;
