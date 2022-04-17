import React from 'react'
import LineChart from './LineChart';
import BarChart from './BarChart';
import { Typography } from '@mui/material';

function ChartAdmin(){
  return(
    <div>
      <Typography textAlign={'center'} mt={3} variant='h4'>Doanh thu theo ngày</Typography>
      <BarChart/>
      <div style={{height: '50px'}}></div>
      <Typography textAlign={'center'} mt={3} variant='h4'>Doanh thu theo Tháng</Typography>
      <LineChart/>
    </div>
  )
}

export default ChartAdmin;