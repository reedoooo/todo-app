import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Container } from '@mantine/core';
import ListItem from '../ListItem';
import Auth from '../Auth/auth';

const List = ({ data, toggleComplete, deleteItem }) => {
  const settings = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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

    let filteredData;
    if (settings.hideCompleted) {
      filteredData = sortedData.filter((item) => !item.complete);
    } else {
      filteredData = sortedData;
    }

    setTaskList(filteredData.slice(start, end));
  }, [data, settings, activePage]);

  useEffect(() => {
    let totalPages;
    if (settings.hideCompleted) {
      totalPages = Math.ceil(
        data?.filter((item) => !item.complete).length / settings.itemsPerPage,
      );
    } else {
      totalPages = Math.ceil(data?.length / settings.itemsPerPage);
    }
    setTotalPages(totalPages);
  }, [data, settings.hideCompleted, settings.itemsPerPage]);

  return (
    <Auth capability="read">
      <Container style={{ minWidth: '65%' }} key="listOfItems">
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
          key="itemsPagination"
          onChange={setActivePage}
          total={totalPages}
          style={{ marginTop: '1rem' }}
        />
      </Container>
    </Auth>
  );
};

export default List;
