import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import { find, filter } from 'lodash';
import { useRecoilValue } from 'recoil';
import { useMutation, gql } from '@apollo/client';

import * as userState from 'atoms/user';
import useUpdateEffect from '@/hooks/useUpdateEffect';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

const UPDATE_TODOS = gql`
  mutation UpdateTodosMutation($updateTodosInput: UpdateTodosInput!) {
    updateTodos(input: $updateTodosInput) {
      _id
      todos {
        _id
        task
        isCompleted
      }
    }
  }
`;

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const user = useRecoilValue(userState.user);
  const [updateTodos] = useMutation(UPDATE_TODOS);

  useEffect(() => {
    const clientTodos = user?.todos ?? [];
    setTodos(clientTodos);
  }, [user]);

  useUpdateEffect(() => {
    let timeout;
    if (user?._id) {
      timeout = setTimeout(() => {
        const updateTodosInput = {
          userId: user._id,
          todos: todos.map((todo) => ({
            _id: todo._id,
            task: todo.task,
            isCompleted: todo.isCompleted,
          })),
        };

        updateTodos({ variables: { updateTodosInput } })
          .then((result) => {
            console.debug('Updated user todos:', result);
          })
          .catch((err) => {
            console.debug("Unable to update user's todos:", err);
          });
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos((todos) => [...todos, { _id: uuid(), task: newTodo, isCompleted: false }]);
  };

  const setTodoComplete = (_id) => {
    const todo = find(todos, { _id });
    const completeTodo = { ...todo, isCompleted: true };
    const restTodos = todos.filter((todo) => todo._id !== _id);
    setTodos([...restTodos, completeTodo]);
  };

  const clearTodo = (_id) => {
    const newTodos = todos.filter((todo) => todo._id !== _id);
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

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
