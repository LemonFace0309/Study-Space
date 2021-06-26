import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const LineChart = ({ options, data }) => {
  return <Line data={data} options={options} />;
};

LineChart.propTypes = {
  options: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default LineChart;
