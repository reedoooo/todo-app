import React from 'react';
import { TextInput, Stack, Button, Slider, Title, Card } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

function ItemForm(props) {
  const { handleChange, handleSubmit, values } = props;

  return (
    <form onSubmit={handleSubmit} style={{ width: '10%', height: '400px' }}>
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
                handleChange({ target: { name: 'dueDate', value: val } })
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
                handleChange({ target: { name: 'difficulty', value: val } })
              }
              value={values.difficulty}
            />

            <Button type="submit">Add Item</Button>
          </Stack>
        </Card.Section>
      </Card>
    </form>
  );
}

export default ItemForm;
