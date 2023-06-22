import React, { useContext } from 'react';
import {
  Switch,
  NativeSelect,
  NumberInput,
  Button,
  Paper,
} from '@mantine/core';
import { FaSave } from 'react-icons/fa';
import { SettingsContext } from '../../Context/Settings';

const SettingsPage = () => {
  const settings = useContext(SettingsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    settings.saveSettingsToLocalStorage();
  };

  const {
    hideCompleted,
    setHideCompleted,
    itemsPerPage,
    setItemsPerPage,
    setSortBy,
  } = settings;

  return (
    <form onSubmit={handleSubmit}>
      <Paper padding="md" shadow="xs">
        <Switch
          label="Hide Completed Tasks"
          id="hideCompleted"
          checked={hideCompleted}
          onChange={() => setHideCompleted(!hideCompleted)}
        />

        <NumberInput
          defaultValue={itemsPerPage}
          label="Tasks per Page"
          min={1}
          max={10}
          required
          id="itemsPerPage"
          onChange={(value) => setItemsPerPage(value)}
        />

        <NativeSelect
          data={['Name', 'DueDate', 'Difficulty']}
          label="Sort Tasks By"
          required
          onChange={(event) => setSortBy(event.target.value)}
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
};

export default SettingsPage;
