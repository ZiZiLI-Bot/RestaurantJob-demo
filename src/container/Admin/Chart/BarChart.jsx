import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import fakeData from './fakeChartData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

const options = {
  responsive: true,
};

const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Thứ 8"];
let index = -1;
const data = {
  labels,
  datasets: [
    {
      data: labels.map(() =>{
        index++;
        return fakeData[index];
      }),
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  ]
};

function BarChart(){
  return(
    <Bar options={options} data ={data}/>
  )
}

export default BarChart;