import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '5px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CallTabPanel = ({ tabTitle, children }) => {
  const classes = useStyles();
  return (
    <div className="h-full bg-white rounded">
      <h1 className={classes.title}>{tabTitle}</h1>
      {children}
    </div>
  );
};

CallTabPanel.propTypes = {
  tabTitle: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default CallTabPanel;
