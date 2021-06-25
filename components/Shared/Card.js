import React from 'react';
import PropTypes from 'prop-types';
import { Paper} from '@material-ui/core';

Card.PropTypes = {
  children: PropTypes.element,
};

export default function Card(props) {
  const { children } = props;
  return <Paper className="rounded-xl">{children}</Paper>;
}

