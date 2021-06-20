import React from 'react';
import { Paper, Box} from "@material-ui/core";



export default function Card(props) {
   const {children} = props;
    return (

      <Paper className="rounded-xl">

       {children}
      
        
    </Paper>)
      
      
    
  }
