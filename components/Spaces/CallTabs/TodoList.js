import React, { useState } from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import { Button, IconButton, Divider, Input, Collapse, List, ListItem, ListItemText } from '@mui/material';
import { Add, RadioButtonUnchecked, Check, ExpandLess, ExpandMore } from '@mui/icons-material';

import { useTodoContext } from '@/context/spaces/TodoContext';

const useStyles = makeStyles((theme) => ({
  clearAll: {
    textTransform: 'none',
    fontSize: 12,
  },
  listItemText: {
    color: theme.palette.primary.dark,
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const { addTodo, setTodoComplete, clearTodo, clearCompletedTodos, completedTodos, incompleteTodos } =
    useTodoContext();
  const [newTodo, setNewTodo] = useState('');
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((open) => !open);
  };

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (newTodo !== '') {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <>
      <List className="h-full flex flex-col justify-between p-1">
        <div>
          <ListItem className="p-1">
            <ListItemText className={classes.listItemText} primary={`Active Tasks (${incompleteTodos.length})`} />
          </ListItem>
          <Divider />
          <form onSubmit={addTodoHandler} className="flex items-center">
            <IconButton type="submit" color="primary" className="p-1" size="large">
              <Add />
            </IconButton>
            <Input
              fullWidth
              placeholder="Add a task"
              variant="standard"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              disableUnderline
            />
          </form>
          <div className="max-h-80 overflow-y-auto">
            {incompleteTodos.map((todo) => (
              <div key={todo._id}>
                <IconButton onClick={() => setTodoComplete(todo._id)} className="p-1" size="large">
                  <RadioButtonUnchecked fontSize="small" />
                </IconButton>
                <span>{todo.task}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Divider />
          <ListItem className="p-1">
            <ListItemText className={classes.listItemText} primary={`Completed (${completedTodos.length})`} />
            <Button className={classes.clearAll} onClick={clearCompletedTodos}>
              Clear All
            </Button>
            <IconButton onClick={handleClick} size="large">
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="max-h-40 overflow-y-auto">
              {completedTodos.map((todo) => (
                <div key={todo._id}>
                  <IconButton className="p-1" onClick={() => clearTodo(todo._id)} size="large">
                    <Check fontSize="small" />
                  </IconButton>
                  <span className="line-through">{todo.task}</span>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      </List>
    </>
  );
};

TodoList.propTypes = {
  username: PropTypes.string,
};

export default TodoList;
