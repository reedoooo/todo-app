import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import List from '../List';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingsPage from '../Settings';
import ItemForm from '../Form';
import { useForm } from '../../Context/hooks/form.js';
import { useTasks } from '../../Context/hooks/task.js';
import { Group, Container, Title, Center } from '@mantine/core';

const Todo = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();
  const { values, handleChange, handleSubmit } = useForm(addTask, {
    difficulty: 0,
    description: '',
    name: '',
    status: false,
    dueDate: null,
  });

  // console.log('Todo --> tasks:', tasks);
  const incomplete = tasks.filter((task) => !task.status).length;
  const task = tasks[0];
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newTask = handleSubmit(event);
    console.log('Todo --> newTask at handleFormSubmit:', newTask);
    await addTask(newTask); // Assuming addTask is your API call function
  };

  return (
    <>
      <BrowserRouter>
        <Header data-testid="todo-header" />

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
                    onSubmit={handleFormSubmit}
                    handleChange={handleChange}
                    values={values}
                    incomplete={incomplete}
                  />

                  <List
                    data={tasks}
                    task={task}
                    toggleComplete={toggleTaskCompletion}
                    deleteItem={deleteTask}
                  />
                </Group>
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default Todo;
