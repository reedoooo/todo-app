// We import the necessary modules and components from React, react-if and mantine/core libraries.
import React from 'react';
import { When } from 'react-if';
import { PasswordInput, TextInput, Button } from '@mantine/core';

// We import our authentication context from our context directory.
import { AuthContext } from '../../Context/Auth/authContext';

// We create a functional component called Login.
function Login() {
  // We use the React hook useContext to access the authContext.
  let authContext = React.useContext(AuthContext);

  // We define username and password as state variables using the useState hook.
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // We define the handleSubmit function which will run when the form is submitted.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submit', { username, password });
    authContext.login(username, password);
  };

  // The return statement provides the UI of the component.
  return (
    <>
      {/* We use a conditional rendering component, When, to render a logout button if the user is already logged in. */}
      <When condition={authContext.isLoggedIn}>
        <Button
          color="red"
          data-testid="logoutButton"
          onClick={authContext.logout} // On button click, it calls the logout function from authContext.
          style={{ maxWidth: '100px' }}
        >
          Log Out
        </Button>
      </When>

      {/* If the user is not logged in, we render a form to allow them to login. */}
      <When condition={!authContext.isLoggedIn}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* The TextInput component is used for username input.
                Whenever its value changes, setUsername is called to update the username state. */}
            <TextInput
              placeholder="Username"
              name="username"
              size="md"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              style={{ width: '40%' }}
            />
            {/* The PasswordInput component is used for password input.
                Whenever its value changes, setPassword is called to update the password state. */}
            <PasswordInput
              placeholder="Password"
              name="password"
              size="md"
              onChange={(event) => setPassword(event.target.value)}
              style={{ width: '40%' }}
            />
            {/* This is the submit button for the form. */}
            <Button
              color="dark"
              data-testid="loginButton"
              type="submit"
              size="md"
            >
              Login
            </Button>
          </div>
        </form>
      </When>
    </>
  );
}

// We export the Login component to be used in other parts of the application.
export default Login;
