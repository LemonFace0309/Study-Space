import { createContext, useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import { find, filter } from 'lodash';
import { useRecoilState } from 'recoil';
import { useMutation, gql } from '@apollo/client';

import * as clientState from 'atoms/client';
import getClient from '@/utils/getClient';

const RoomContext = createContext();

export const useRoomContext = () => {
  return useContext(RoomContext);
};

const UPDATE_TODOS = gql`
  mutation UpdateTodosMutation($updateTodosInput: UpdateTodosInput!) {
    updateTodos(input: $updateTodosInput) {
      _id
      todos {
        key
        task
        isCompleted
      }
    }
  }
`;

export const RoomProvider = ({ children }) => {
  const firstRender = useRef(true);
  const [todos, setTodos] = useState([]);
  const [client, setClient] = useRecoilState(clientState.client);
  const [updateTodos] = useMutation(UPDATE_TODOS);

  const setTodosFromClient = (client = client) => {
    const clientTodos = client?.todos ?? [];
    setTodos(
      clientTodos.map((todo) => ({
        key: todo?.key,
        task: todo?.task,
        isCompleted: todo?.isCompleted,
      }))
    );
  };

  const initClient = async () => {
    try {
      const newClient = await getClient();
      if (newClient) {
        setClient(newClient);
        setTodosFromClient(newClient);
      }
    } catch (err) {
      console.debug('Unable to initialize client:', client);
    }
  };

  useEffect(() => {
    let timeout;
    if (firstRender.current && !client) {
      initClient();
    } else if (firstRender.current && client?.todos) {
      setTodosFromClient();
    } else if (!firstRender.current && client?._id) {
      timeout = setTimeout(() => {
        const updateTodosInput = {
          userId: client._id,
          todos,
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
    firstRender.current = false;

    return () => clearTimeout(timeout);
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos((todos) => [...todos, { key: uuid(), task: newTodo, isCompleted: false }]);
  };

  const setTodoComplete = (key) => {
    const completeTodo = find(todos, { key });
    completeTodo.isCompleted = true;
    const restTodos = todos.filter((todo) => todo.key !== key);
    setTodos([...restTodos, completeTodo]);
  };

  const clearTodo = (key) => {
    const newTodos = todos.filter((todo) => todo.key !== key);
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
