import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Container } from '@mantine/core';
import ListItem from '../ListItem';

const List = ({ task, data, toggleComplete, deleteItem }) => {
  const settings = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [taskList, setTaskList] = useState([]);

  const updateTaskList = (start, end, sortBy, data) => {
    let allTasks = [];
    data.forEach((document) => {
      if (document.tasks && document.tasks.length > 0) {
        allTasks.push(document.tasks[0]);
      }
    });
    allTasks = allTasks.filter(Boolean); // Filter out undefined tasks
    allTasks.sort((a, b) =>
      a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0,
    );
    // const tasks = allTasks.slice(start, end);
    const tasks = allTasks;
    console.log('List --> updateTaskList:', tasks);
    console.log('List --> task:', task);
    const newValue = tasks.filter((item) => item._id !== task._id);
    setTaskList(newValue);
  };

  useEffect(() => {
    let allTasks = [];
    data.forEach((document) => {
      if (document.tasks && document.tasks.length > 0) {
        allTasks.push(document.tasks[0]);
      }
    });
    const completeTasksCount = allTasks.filter((task) => task.status).length;

    let newTotalPages;
    if (settings.hideCompleted) {
      newTotalPages = Math.ceil(
        (allTasks.length - completeTasksCount) / settings.itemsPerPage,
      );
    } else {
      newTotalPages = Math.ceil(allTasks.length / settings.itemsPerPage);
    }
    setTotalPages(newTotalPages);
  }, [data, settings.hideCompleted, settings.itemsPerPage]);

  useEffect(() => {
    updateTaskList(
      settings.itemsPerPage * (activePage - 1),
      settings.itemsPerPage * (activePage - 1) + settings.itemsPerPage,
      settings.sortBy,
      data,
    );
  }, [activePage, settings.itemsPerPage, settings.sortBy, data]);

  // console.log('List --> taskList:', taskList);

  return (
    <Container style={{ minWidth: '65%' }}>
      {taskList.map((item, index) => (
        <ListItem
          key={`${item._id}_${index}`}
          item={item}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      ))}
      <Pagination
        value={activePage}
        onChange={setActivePage}
        total={totalPages}
      />
    </Container>
  );
};

export default List;
