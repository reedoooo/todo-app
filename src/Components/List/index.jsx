// import React, { useContext, useEffect, useState } from 'react';

// import { SettingsContext } from '../../Context/Settings';
// import { Pagination, Container } from '@mantine/core';
// import ListItem from '../ListItem';

// function List(props) {
//   const settings = useContext(SettingsContext);
//   const [activePage, setActivePage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [taskList, setTaskList] = useState([]);
//   const [start, setStart] = useState(settings.itemsPerPage * (activePage - 1));
//   const [end, setEnd] = useState(start + settings.itemsPerPage);

//   // sorts tasks by property
//   useEffect(() => {
//     const dataCopy = [...props.data];
//     dataCopy.sort((a, b) => {
//       if (a[settings.sortBy] < b[settings.sortBy]) {
//         return -1;
//       } else if (a[settings.sortBy] > b[settings.sortBy]) {
//         return 1;
//       } else return 0;
//     });
//     setTaskList(dataCopy.slice(start, end));
//   }, [props.data, settings.sortBy, start, end]);

//   // updates start index for displayed tasks from taskList
//   useEffect(() => {
//     setStart(settings.itemsPerPage * (activePage - 1));
//   }, [activePage, settings.itemsPerPage]);

//   // updates end index for displayed tasks from taskList
//   useEffect(() => {
//     setEnd(start + settings.itemsPerPage);
//   }, [start, settings.itemsPerPage]);

//   // Pagination calculation
//   useEffect(() => {
//     const completeTasksCount = props.data.filter(
//       (item) => item.complete,
//     ).length;
//     settings.hideCompleted
//       ? setTotalPages(
//           Math.ceil(
//             (props.data.length - completeTasksCount) / settings.itemsPerPage,
//           ),
//         )
//       : setTotalPages(Math.ceil(props.data.length / settings.itemsPerPage));
//   }, [props.data, settings.hideCompleted, settings.itemsPerPage]);

//   return (
//     <Container style={{ minWidth: '65%' }}>
//       {taskList.map((item, index) => {
//         return (
//           <ListItem
//             key={`${item.id}_${index}`} // temp key for debugging
//             item={item}
//             toggleComplete={props.toggleComplete}
//             deleteItem={props.deleteItem}
//           />
//         );
//       })}

//       <Pagination
//         value={activePage}
//         onChange={setActivePage}
//         total={totalPages}
//       />
//     </Container>
//   );
// }

// export default List;

import React, { useContext, useEffect, useState } from 'react';

import { SettingsContext } from '../../Context/Settings';
import { Pagination, Container } from '@mantine/core';
import ListItem from '../ListItem';

function List(props) {
  const settings = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [start, setStart] = useState(settings.itemsPerPage * (activePage - 1));
  const [end, setEnd] = useState(start + settings.itemsPerPage);
  const { item } = props;

  // Check if item and status exist
  if (!item || item.status === undefined) {
    return null; // or some fallback UI
  }
  // sorts tasks by property
  useEffect(() => {
    let allTasks = [];
    props.data.forEach((document) => allTasks.push(...document.task));

    allTasks.sort((a, b) => {
      if (a[settings.sortBy] < b[settings.sortBy]) {
        return -1;
      } else if (a[settings.sortBy] > b[settings.sortBy]) {
        return 1;
      } else return 0;
    });
    setTaskList(allTasks.slice(start, end));
  }, [props.data, settings.sortBy, start, end]);

  // updates start index for displayed tasks from taskList
  useEffect(() => {
    setStart(settings.itemsPerPage * (activePage - 1));
  }, [activePage, settings.itemsPerPage]);

  // updates end index for displayed tasks from taskList
  useEffect(() => {
    setEnd(start + settings.itemsPerPage);
  }, [start, settings.itemsPerPage]);

  // Pagination calculation
  useEffect(() => {
    let allTasks = [];
    props.data.forEach((document) => allTasks.push(...document.task));
    const completeTasksCount = allTasks.filter((item) => item.status).length;
    settings.hideCompleted
      ? setTotalPages(
          Math.ceil(
            (allTasks.length - completeTasksCount) / settings.itemsPerPage,
          ),
        )
      : setTotalPages(Math.ceil(allTasks.length / settings.itemsPerPage));
  }, [props.data, settings.hideCompleted, settings.itemsPerPage]);

  return (
    <Container style={{ minWidth: '65%' }}>
      {taskList.map((item, index) => {
        return (
          <ListItem
            key={`${item._id}_${index}`} // temp key for debugging
            item={item}
            toggleComplete={props.toggleComplete}
            deleteItem={props.deleteItem}
          />
        );
      })}

      <Pagination
        value={activePage}
        onChange={setActivePage}
        total={totalPages}
      />
    </Container>
  );
}

export default List;
