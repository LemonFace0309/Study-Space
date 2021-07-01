import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

const Card = ({ children }) => {
  return <Paper className="rounded-xl">{children}</Paper>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
