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
        // console.log('Fetch tasks response:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Fetch tasks error:', error.message);
      }
    };
    fetchTasks();
  }, []);

  // Add a task
  const addTask = async (newTask) => {
    console.log('Add task values:', newTask);
    // ...
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`,
        { task: newTask }, // Wrap newTask into a 'task' object
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Add task error:', error.message);
    }
  };

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
      taskToToggle.status = !taskToToggle.status;
      try {
        await axios.put(
          `${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`,
          { task: taskToToggle }, // Wrap taskToToggle into a 'task' object
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
