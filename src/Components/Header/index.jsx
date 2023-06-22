import React, { useState } from 'react';
import { Paper, Text, Group, Switch } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCog, FaSun, FaMoon } from 'react-icons/fa';
import Login from '../Auth/login';

function Header() {
  const [isDark, setIsDark] = useState(false);

  const handleThemeChange = () => {
    setIsDark(!isDark);
    // you can add logic to actually change the theme here
  };

  return (
    <header data-testid="todo-header">
      <Paper padding="md" shadow="xs">
        <Group position="apart" align="center">
          <Text
            style={{
              color: '#1c7ed6',
              letterSpacing: 1.5,
              transition: 'all .5s ease',
            }}
            size="xl"
            weight={500}
          >
            ToDo App
          </Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '15px' }}>
              <NavLink
                style={{
                  color: '#1c7ed6',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all .3s ease',
                }}
                to="/"
              >
                <FaHome style={{ marginRight: 5 }} />
                Home
              </NavLink>
            </div>
            <div style={{ marginRight: '20px' }}>
              <NavLink
                style={{
                  color: '#1c7ed6',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all .3s ease',
                }}
                to="/settings"
              >
                <FaCog style={{ marginRight: 5 }} />
                Settings
              </NavLink>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                color={isDark ? 'red' : 'teal'}
                checked={isDark}
                onChange={handleThemeChange}
                style={{ transition: 'all .5s ease' }}
              />
              {isDark ? (
                <FaMoon
                  style={{ marginLeft: 10, transition: 'all .5s ease' }}
                />
              ) : (
                <FaSun style={{ marginLeft: 10, transition: 'all .5s ease' }} />
              )}
            </div>
          </div>
          <Login />
        </Group>
      </Paper>
    </header>
  );
}

export default Header;
