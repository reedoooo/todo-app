import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Group, Container, Title, Center } from '@mantine/core';

import Header from '../Header';
import Footer from '../Footer';
import List from '../List';
import SettingsPage from '../Settings';
import ItemForm from '../Form';

import useForm from '../../Context/hooks/form.js';
import useTasks from '../../Context/hooks/task.js';
import Auth from '../Auth';

const Todo = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();

  const handleFormSubmit = async (values) => {
    await addTask(values);
  };

  const { values, handleChange, handleSubmit } = useForm(handleFormSubmit, {
    difficulty: 0,
    description: '',
    name: '',
    status: false,
    dueDate: null,
  });

  const incomplete = tasks.filter((task) => !task.status).length;

  return (
    <>
      <BrowserRouter>
        <Header data-testid="todo-header" />
        <Auth>
          <Routes>
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/"
              element={
                <Container style={{ minHeight: '75vh' }}>
                  <Center
                    data-testid="todoContainer"
                    style={{
                      backgroundColor: '#343a40',
                      color: 'white',
                      padding: '1.5rem',
                      margin: '2rem 4rem',
                    }}
                  >
                    <Title order={2} align="left">
                      To Do List: {incomplete} items pending
                    </Title>
                  </Center>
                  <Group
                    position="apart"
                    grow
                    style={{ margin: '2rem 5rem', alignItems: 'flex-start' }}
                  >
                    <ItemForm
                      onSubmit={handleSubmit}
                      handleChange={handleChange}
                      values={values}
                      incomplete={incomplete}
                    />

                    <List
                      data={tasks}
                      toggleComplete={toggleTaskCompletion}
                      deleteItem={deleteTask}
                    />
                  </Group>
                </Container>
              }
            />
          </Routes>

          <Footer />
        </Auth>
      </BrowserRouter>
    </>
  );
};

export default Todo;
