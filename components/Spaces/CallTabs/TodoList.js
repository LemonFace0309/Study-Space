import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Divider, TextField, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { Add, RadioButtonUnchecked, Check, ExpandLess, ExpandMore } from '@material-ui/icons';

import { useRoomContext } from '@/context/RoomContext';

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
    useRoomContext();
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
            <IconButton type="submit" color="primary" className="p-1">
              <Add />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Add a task"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
          </form>
          <div className="max-h-80 overflow-y-auto">
            {incompleteTodos.map((todo) => (
              <div key={todo.id}>
                <IconButton onClick={() => setTodoComplete(todo.id)} className="p-1">
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
            <IconButton onClick={handleClick}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="max-h-40 overflow-y-auto">
              {completedTodos.map((todo) => (
                <div key={todo.id}>
                  <IconButton className="p-1" onClick={() => clearTodo(todo.id)}>
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
