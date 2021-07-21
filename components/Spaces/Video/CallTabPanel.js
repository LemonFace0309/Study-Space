import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '5px 10px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CallTabPanel = ({ tabTitle, children }) => {
  const classes = useStyles();
  return (
    <Paper elevation={2} className="flex flex-col w-90 h-full overflow-hidden rounded-xl">
      <h1 className={classes.title}>{tabTitle}</h1>
      <div className="h-full p-2 bg-gray-100">{children}</div>
    </Paper>
  );
};

CallTabPanel.propTypes = {
  tabTitle: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default CallTabPanel;
