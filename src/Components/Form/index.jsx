import React from 'react';
import { TextInput, Stack, Button, Slider, Title, Card } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
// import Auth from '../Auth/index.jsx';
import Auth from '../Auth/auth';

const ItemForm = ({ onSubmit, handleChange, values }) => {
  return (
    <Auth capability="create">
      <form onSubmit={onSubmit} style={{ width: '10%', height: '400px' }}>
        <Card shadow="sm" radius="md" withBorder>
          <Card.Section style={{ margin: '0' }}>
            <Stack spacing="xl">
              <Title order={2}>Add To Do Item</Title>

              <TextInput
                name="name"
                placeholder="Name"
                label="Task Name *"
                onChange={handleChange}
                value={values.name}
              />

              <TextInput
                name="description"
                placeholder="Task Description"
                label="Task Description *"
                onChange={handleChange}
                value={values.description}
              />

              <DatePicker
                name="dueDate"
                label="Due Date *"
                onChange={(val) =>
                  handleChange({ name: 'dueDate', value: val })
                }
                value={values.dueDate}
              />

              <Slider
                name="difficulty"
                label="Difficulty *"
                radius="md"
                min={1}
                max={5}
                marks={[
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                ]}
                onChange={(val) =>
                  handleChange({ name: 'difficulty', value: val })
                }
                value={values.difficulty}
              />

              <Button type="submit">Add Item</Button>
            </Stack>
          </Card.Section>
        </Card>
      </form>
    </Auth>
  );
};

export default ItemForm;
