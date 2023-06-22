import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Container } from '@mantine/core';
import ListItem from '../ListItem';
import Auth from '../Auth/index.jsx';

const List = ({ data, toggleComplete, deleteItem }) => {
  const settings = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const start = settings.itemsPerPage * (activePage - 1);
    const end = start + settings.itemsPerPage;

    const sortedData = [...data].sort((a, b) => {
      if (a[settings.sortBy] < b[settings.sortBy]) {
        return -1;
      } else if (a[settings.sortBy] > b[settings.sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });

    const filteredData = settings.hideCompleted
      ? sortedData.filter((item) => !item.complete)
      : sortedData;

    setTaskList(filteredData.slice(start, end));
  }, [data, settings, activePage]);

  const totalPages = Math.ceil(
    settings.hideCompleted
      ? data.filter((item) => !item.complete).length / settings.itemsPerPage
      : data.length / settings.itemsPerPage,
  );

  return (
    <Auth capability="read">
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
    </Auth>
  );
};

export default List;
