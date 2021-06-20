import React from 'react';
import { Paper, Box, Typography } from "@material-ui/core";
import Card from "../../Shared/Card"
import { TitleOutlined } from '@material-ui/icons';





export default function ChartCard(props) {
   const {title, date, chart} = props;
    return (

      <Card>
        <Box className="text-left p-3">
          <Typography variant="h5"  className="text-primary-dark font-bold">
          {title}
          </Typography>
          <Typography  variant="body1" className="text-primary-text">
          {date}
          </Typography>
        </Box>

        <Box >
        {chart}
        </Box>
    </Card>)
      
      
    
  }
