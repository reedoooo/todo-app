// We import necessary modules from React, react-cookies, jwt-decode and axios libraries.
import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// We create an authentication context that will be used by other components to access authentication state and methods.
export const AuthContext = React.createContext();

// We create an AuthProvider component which provides an authentication context to its children.
function AuthProvider(props) {
  // We define isLoggedIn, user, error and token as state variables using the useState hook.
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({ capabilities: [] });
  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(undefined);

  // This function is used to set the state of the user login and save the user's token in a cookie.
  const setLoginState = (loggedIn, token, user, error) => {
    console.log('Setting login state', { loggedIn, token, user, error });
    cookie.save('auth', token);
    setIsLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error || null);
  };

  // This function validates the user's token using jwt_decode.
  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      console.log('Decoded token', validUser);
      setLoginState(true, token, validUser);
    } catch (e) {
      console.log('Token Validation Error', e);
      setLoginState(false, null, {}, e);
    }
  };

  // This function checks if the user has a certain capability.
  const can = (capability) => {
    console.log('Checking capability', capability, user?.capabilities);
    return user?.capabilities?.includes(capability);
  };

  // This function sends a POST request to the server with the user's credentials to log them in.
  const login = async (username, password) => {
    console.log('Login called', { username, password });
    let credentials = {
      auth: {
        username: username,
        password: password,
      },
    };

    axios
      .post(`${process.env.REACT_APP_SERVER}/signin`, credentials)
      .then((response) => {
        console.log('Login response', response);
        validateToken(response.data.token);
      })
      .catch((error) => {
        console.log('Login error', error);
        setLoginState(isLoggedIn, token, user, error);
      });
  };

  // This function logs the user out by setting the state and removing the token cookie.
  const logout = () => {
    setLoginState(false, null, {});
    cookie.remove('auth');
  };

  // We use useEffect hook as a "componentDidMount" equivalent.
  // We retrieve the token from the URL query string or from the cookie, then validate it.
  React.useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
    // eslint-disable-next-line
  }, []);

  // We provide the state variables and functions as the value of AuthContext.Provider.
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, can, error }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// We export the AuthProvider component to be used in other parts of the application.
export default AuthProvider;
