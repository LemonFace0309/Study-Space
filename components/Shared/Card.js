import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';

const Card = ({ isClickable, roundedFull, children }) => {
  return (
    <Paper
      elevation={5}
      className={classNames('rounded-none rounded-tr-xl rounded-bl-xl overflow-hidden h-full', {
        'rounded-xl': roundedFull,
        'cursor-pointer transform hover:-translate-y-1 transition ease-out duration-200': isClickable,
      })}>
      {children}
    </Paper>
  );
};

Card.propTypes = {
  isClickable: PropTypes.bool,
  roundedFull: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  isClickable: false,
  roundedFull: false,
};

export default Card;
