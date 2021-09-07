import { createContext, useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import { find, filter } from 'lodash';
import { useRecoilState } from 'recoil';
import { useMutation, gql } from '@apollo/client';

import * as userState from 'atoms/user';
import getUser from '@/utils/getUser';

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
  const [user, setUser] = useRecoilState(userState.user);
  const [updateTodos] = useMutation(UPDATE_TODOS);

  console.debug(todos);
  const setTodosFromClient = (u = user) => {
    console.debug('USERRRRRRRRRRRRRRRRRRRRRR:', u);
    const clientTodos = u?.todos ?? [];
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
      const newClient = await getUser();
      if (newClient) {
        setUser(newClient);
        setTodosFromClient(newClient);
      }
    } catch (err) {
      console.debug('Unable to initialize user:', user);
    }
  };

  useEffect(() => {
    let timeout;
    if (firstRender.current && !user) {
      console.debug(1);
      initClient();
    } else if (firstRender.current && user?.todos) {
      console.debug(2, user);
      setTodosFromClient();
    } else if (!firstRender.current && user?._id) {
      console.debug(3);
      timeout = setTimeout(() => {
        const updateTodosInput = {
          userId: user._id,
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
