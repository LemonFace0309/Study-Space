import { createContext, useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uniqueId, find, filter } from 'lodash';
import { useRecoilValue } from 'recoil';
import { useMutation, gql } from '@apollo/client';

import * as clientState from 'atoms/client';

const RoomContext = createContext();

export const useRoomContext = () => {
  return useContext(RoomContext);
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

export const RoomProvider = ({ children }) => {
  const firstRender = useRef(true);
  const [todos, setTodos] = useState([]);
  const client = useRecoilValue(clientState.client);
  const [updateTodos] = useMutation(UPDATE_TODOS);

  useEffect(() => {
    let timeout;
    if (firstRender.current && client?.todos) {
      setTodos(client.todos);
    } else if (!firstRender.current && client?._id) {
      timeout = setTimeout(() => {
        const updateTodosInput = {
          userId: client._id,
          todos,
        };
        console.debug('todos input:', updateTodosInput);

        updateTodos({ variables: { updateTodosInput } })
          .then((result) => {
            console.debug(result);
          })
          .catch((err) => {
            console.debug("Unable to update user's todos:", err);
          });
      }, 2000);
    }
    firstRender.current = false;

    return () => clearTimeout(timeout);
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos((todos) => [...todos, { key: uniqueId(), task: newTodo, isCompleted: false }]);
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
