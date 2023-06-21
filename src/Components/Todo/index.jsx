import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import List from '../List';
// import { v4 as uuid } from 'uuid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingsPage from '../Settings';
import ItemForm from '../Form';
import { useForm } from '../../Context/hooks/form.js';
import { useTasks } from '../../Context/hooks/task.js';
import { Group, Container, Title, Center } from '@mantine/core';

const Todo = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();
  const { values, handleChange, handleSubmit } = useForm({
    difficulty: 0,
    description: '',
    name: '',
    status: false,
    dueDate: null, // Include dueDate in initial form values
  });
  // const complete = tasks.filter((task) => task.status).length;
  const incomplete = tasks.filter((task) => !task.status).length;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const taskValues = handleSubmit(e);
    addTask(taskValues);
  };

  return (
    <>
      <Header data-testid="todo-header" />
      <BrowserRouter>
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
                    handleSubmit={handleFormSubmit}
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
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default Todo;

// import React, { useEffect, useState } from 'react';
// import useForm from '../../Context/hooks/form';
// import Header from '../Header';
// import Footer from '../Footer';
// import List from '../List';

// import axios from 'axios';
// import { v4 as uuid } from 'uuid';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SettingsPage from '../Settings';
// import ItemForm from '../Form';

// import { Group, Container, Title, Center } from '@mantine/core';

// const Todo = () => {
//   const [defaultValues] = useState({ difficulty: 4 });
//   const [list, setList] = useState([]);
//   const [incomplete, setIncomplete] = useState([]);

//   const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

//   function addItem(item) {
//     item.id = uuid();
//     item.complete = false;
//     console.log(JSON.stringify(item));

//     axios
//       .post(
//         `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`,
//         JSON.stringify(item),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       )
//       .then((response) => {
//         console.log('Add item response:', response.data);
//         setList([...list, item]);
//       })
//       .catch((error) => {
//         console.log('Add item error:', error.message);
//       });
//   }

//   function deleteItem(id) {
//     const items = list.filter((item) => item._id !== id);

//     axios
//       .delete(`${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`)
//       .then((response) => {
//         console.log('Delete item response:', response.data);
//         setList(items);
//       })
//       .catch((error) => {
//         console.log('Delete item error:', error.message);
//       });
//   }

//   function toggleComplete(id) {
//     console.log(id);
//     let toggledItem;

//     const items = list.map((item) => {
//       console.log(item);
//       console.log(id);
//       if (item._id === id) {
//         item.complete = !item.complete;
//       }
//       toggledItem = item;
//       return item;
//     });

//     axios
//       .put(
//         `${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`,
//         toggledItem,
//       )
//       .then((response) => {
//         console.log('Toggle complete response:', response.data);
//         setList(items);
//       })
//       .catch((error) => {
//         console.log('Toggle complete error:', error.message);
//       });
//   }

//   useEffect(() => {
//     let incompleteCount = list.filter((item) => !item.complete).length;
//     setIncomplete(incompleteCount);
//     document.title = `To Do List: ${incomplete}`;
//     // linter will want 'incomplete' added to dependency array unnecessarily.
//     // disable code used to avoid linter warning
//   }, [list]);

//   // componentDidMount - fetches tasks from server / database when List component mounts
//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_SERVER}/api/myTodoRoutes`)
//       .then((response) => {
//         console.log('Fetch items on mount response:', response.data);
//         setList(response.data);
//       })
//       .catch((error) => {
//         console.log('Fetch items on mount error:', error.message);
//       });
//   }, []);

//   // checks if there are any discrepancies between state and the database, updates accordingly
//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_SERVER}/api/myTodoRoutes`)
//       .then((response) => {
//         console.log('Fetch items to check updates response:', response.data);
//         let dbTasks = [...response.data];
//         let foundTasks = 0;

//         dbTasks.forEach((dbTask) => {
//           list.forEach((task) => {
//             if (dbTask._id === task._id) {
//               foundTasks = foundTasks + 1;
//             }
//           });
//         });

//         if (foundTasks !== list.length) {
//           setList(response.data);
//         } else {
//           return 'Task List is currently up to date';
//         }
//       });
//   }, [list]);

//   return (
//     <>
//       <Header data-testid="todo-header" />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/settings" element={<SettingsPage />} />
//           <Route
//             path="/"
//             element={
//               <Container style={{ minHeight: '75vh' }}>
//                 <Center
//                   data-testid="todoContainer"
//                   style={{
//                     color: 'white',
//                     padding: '1.5rem',
//                     margin: '2rem 4rem',
//                   }}
//                 >
//                   <Title order={2} align="left">
//                     To Do List: {incomplete} items pending
//                   </Title>
//                 </Center>
//                 <Group
//                   position="apart"
//                   grow
//                   style={{ margin: '2rem 5rem', alignItems: 'flex-start' }}
//                 >
//                   <ItemForm
//                     handleSubmit={handleSubmit}
//                     handleChange={handleChange}
//                     incomplete={incomplete}
//                   />

//                   <List
//                     data={list}
//                     toggleComplete={toggleComplete}
//                     deleteItem={deleteItem}
//                   />
//                 </Group>
//               </Container>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//       <Footer />
//     </>
//   );
// };

// export default Todo;
