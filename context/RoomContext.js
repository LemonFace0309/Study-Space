import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uniqueId, find, filter } from 'lodash';

const RoomContext = createContext();

export const useRoomContext = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos((todos) => [...todos, { id: uniqueId(), todoTask: newTodo, isCompleted: false }]);
  };

  const setTodoComplete = (id) => {
    const completeTodo = find(todos, { id });
    completeTodo.isCompleted = true;
    const restTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...restTodos, completeTodo]);
  };

  const clearTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const clearCompletedTodos = () => {
    setTodos(filter(todos, { isCompleted: false }));
  };

  const completedTodos = filter(todos, { isCompleted: true });
  const incompleteTodos = filter(todos, { isCompleted: false });

  const value = {
    todos,
    setTodos,
    addTodo,
    setTodoComplete,
    clearTodo,
    clearCompletedTodos,
    completedTodos,
    incompleteTodos,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
