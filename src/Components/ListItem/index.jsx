import React from 'react';

import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  CardSection,
  Container,
} from '@mantine/core';

function ListItem(props) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Card.Section withBorder>
        <Group
          className="listItemHeader"
          position="apart"
          style={{ paddingLeft: '1rem' }}
        >
          <Group spacing="xl">
            {props.item.status === true ? (
              <Badge color="red" variant="filled">
                Complete
              </Badge>
            ) : (
              <Badge color="green" variant="filled">
                Pending
              </Badge>
            )}
            <Text fw={500}>{props.item.name}</Text>
          </Group>

          <Button
            color="red"
            size="xs"
            onClick={() => props.deleteItem(props.item._id)}
          >
            X
          </Button>
        </Group>
      </Card.Section>

      <Card.Section withBorder>
        <Container size="97.5%" px={0}>
          <Text>{props.item.description}</Text>
          <Text align="right">Difficulty: {props.item.difficulty}</Text>
        </Container>
      </Card.Section>
      <CardSection>
        <Group position="right">
          <Button onClick={() => props.toggleComplete(props.item._id)}>
            Complete
          </Button>
        </Group>
      </CardSection>
    </Card>
  );
}

export default ListItem;

// import React from 'react';

// import {
//   Card,
//   Text,
//   Badge,
//   Button,
//   Group,
//   CardSection,
//   Container,
// } from '@mantine/core';

// const ListItem = ({ task, data, toggleComplete, deleteItem }) => {
//   // const { _id, name, status } = task;
//   console.log('ListItem --> data:', data);
//   console.log('ListItem --> task:', task);
//   const handleToggle = () => {
//     toggleComplete(data.task._id);
//   };

//   const handleDelete = () => {
//     deleteItem(data.task._id);
//   };
//   return (
//     <Card shadow="sm" radius="md" withBorder>
//       <Card.Section withBorder>
//         <Group
//           className="listItemHeader"
//           position="apart"
//           style={{ paddingLeft: '1rem' }}
//         >
//           <Group spacing="xl">
//             {data.status === true ? (
//               <Badge color="red" variant="filled">
//                 Complete
//               </Badge>
//             ) : (
//               <Badge color="green" variant="filled">
//                 Pending
//               </Badge>
//             )}
//             <Text fw={500}>{data.task.name}</Text>
//           </Group>

//           <Button
//             color="red"
//             size="xs"
//             onClick={() => task.deleteItem(data.task._id)}
//           >
//             X
//           </Button>
//         </Group>
//       </Card.Section>

//       <Card.Section withBorder>
//         <Container size="97.5%" px={0}>
//           <Text>{data.task.description}</Text>
//           <Text align="right">Difficulty: {data.difficulty}</Text>
//         </Container>
//       </Card.Section>
//       <CardSection>
//         <Group position="right">
//           <Button onClick={() => data.task.toggleComplete(data.task._id)}>
//             {data.task.status === true ? 'incomplete' : 'complete'}
//           </Button>
//         </Group>
//       </CardSection>
//     </Card>
//   );
// };

// export default ListItem;
