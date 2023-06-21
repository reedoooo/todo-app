import React from 'react';
import {
  Switch,
  NativeSelect,
  NumberInput,
  Button,
  Paper,
} from '@mantine/core';
import { FaSave } from 'react-icons/fa';
import { SettingsContext } from '../../Context/Settings';

function SettingsPage() {
  const settings = React.useContext(SettingsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    settings.saveSettingsToLocalStorage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper padding="md" shadow="xs">
        <Switch
          label="Hide Completed Tasks"
          id="hideCompleted"
          checked={settings.hideCompleted}
          onChange={() => settings.setHideCompleted(!settings.hideCompleted)}
        />

        <NumberInput
          defaultValue={settings.itemsPerPage}
          label="Tasks per Page"
          min={1}
          max={10}
          required
          id="itemsPerPage"
          onChange={(event) => {
            settings.setItemsPerPage(event);
          }}
        />

        <NativeSelect
          data={['Name', 'DueDate', 'Difficulty']}
          label="Sort Tasks By"
          required
          onChange={(event) => {
            settings.setSortBy(event.target.value);
          }}
        />

        <Button
          type="submit"
          color="blue"
          leftIcon={<FaSave />}
          style={{ marginTop: '15px' }}
        >
          Save
        </Button>
      </Paper>
    </form>
  );
}

export default SettingsPage;
