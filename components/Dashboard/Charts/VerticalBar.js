import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const VerticalBar = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

VerticalBar.propTypes = {
  options: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default VerticalBar;
