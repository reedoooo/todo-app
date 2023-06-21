// Custom Hooks (useTasks.js)
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`,
        );

        setTasks(response.data);
      } catch (error) {
        console.error('Fetch tasks error:', error.message);
      }
    };
    fetchTasks();
  }, []);
  console.log('tasks', tasks);
  // Add a task
  // Add a task
  const addTask = async (newTask) => {
    console.log('addTask', newTask);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`,
        JSON.stringify(newTask),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log('Add task response:', response.data);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Add task error:', error.message);
    }
  };

  // const addTask = async (task) => {
  //   console.log('addTask', task);
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`,
  //       JSON.stringify(task),
  //       {
  //         headers: { 'Content-Type': 'application/json' },
  //       },
  //     );

  //     console.log('Add task response:', response.data);
  //     setTasks((prevTasks) => [...prevTasks, response.data]);
  //   } catch (error) {
  //     console.error('Add task error:', error.message);
  //   }
  // };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`,
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Delete task error:', error.message);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id) => {
    const taskToToggle = tasks.find((task) => task._id === id);
    if (taskToToggle) {
      taskToToggle.complete = !taskToToggle.complete;
      try {
        await axios.put(
          `${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`,
          taskToToggle,
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? taskToToggle : task)),
        );
      } catch (error) {
        console.error('Toggle task completion error:', error.message);
      }
    }
  };

  return { tasks, addTask, deleteTask, toggleTaskCompletion };
};
