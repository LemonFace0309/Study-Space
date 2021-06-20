import React from "react";

import ProgressBar from "./ProgressBar";
import {
  Paper,
  Container,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";

export default function Timer(props) {


  return (
    <Paper elevate={10} className="rounded-3xl">
      <Box
   
        className="flex flex-col justify-center p-5 rounded-3xl bg-primary-light"
      >
        <Grid className="grid grid-cols-1">
          <Box
            className="rounded-lg bg-primary-medium_light"
          >
            <Typography
              variant="body1"
              className="text-center uppercase tracking-wide font-bold "
            >
              Almost there! Take a break in
            </Typography>
          </Box>

          <Container className="flex flex-col text-center justify-between ">
            <Box
             
              className="text-6xl uppercase tracking-widest font-semibold text-primary-dark"
            >
              <Typography variant="h3" color="primary">
           
                01:15
              </Typography>
            </Box>
            <Box

              className="flex flex-row justify-between m-auto space-x-10 uppercase"
            >
              <Typography variant="body1">Hour</Typography>
              <Typography variant="body1">Minutes</Typography>
            </Box>
          </Container>

          <Container className="flex flex-col text-center justify-between ">
            <Box className="text-primary-dark">
              <ProgressBar />
            </Box>
            <Box
    
              className="flex flex-row justify-between text-sm tracking-tight font-semibold"
            >
              <Typography variant="body1">12:10 pm </Typography>
              <Typography variant="body1">2:30 pm</Typography>
            </Box>
          </Container>
        </Grid>
      </Box>
    </Paper>
  );
}
