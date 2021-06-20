import React from 'react';
import { Line } from 'react-chartjs-2';



export default function LineChart(props){
    const {options, data} = props;
    return (<Line data={data} options={options} />)
} 

