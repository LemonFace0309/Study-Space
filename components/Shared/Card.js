import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';

const Card = ({ isClickable, children }) => {
  return (
    <Paper
      elevation={5}
      className={classNames('rounded-xl overflow-hidden h-full', {
        'cursor-pointer transform hover:scale-105 transition ease-out duration-200': isClickable,
      })}>
      {children}
    </Paper>
  );
};

Card.propTypes = {
  isClickable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Card;
