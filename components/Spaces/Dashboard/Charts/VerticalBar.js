import React from 'react';
import { Bar } from 'react-chartjs-2';


export default function VerticalBar(props) {
  const{ data, options } = props;

  return (
    <Bar data={data} options={options} />
  );
}


