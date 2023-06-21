import { render, fireEvent, screen } from '@testing-library/react';
import Todo from './Todo';
import { SettingsContext } from '../../Context/Settings';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Todo', () => {
  // Mock context data
  const mockContext = {
    itemsPerPage: 3,
    setItemsPerPage: jest.fn(),
    hideCompleted: true,
    setHideCompleted: jest.fn(),
    sortBy: 'difficulty',
    setSortBy: jest.fn(),
    saveSettingsToLocalStorage: jest.fn(),
  };

  it('renders without crashing', () => {
    render(
      <SettingsContext.Provider value={mockContext}>
        <Router>
          <Todo />
        </Router>
      </SettingsContext.Provider>,
    );
  });

  it('renders a header and footer', () => {
    render(
      <SettingsContext.Provider value={mockContext}>
        <Router>
          <Todo />
        </Router>
      </SettingsContext.Provider>,
    );
    const header = screen.getByTestId('todo-header');
    const footer = screen.getByText(/OpenAI's GPT-4/i);

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  // Add more tests as necessary
});
