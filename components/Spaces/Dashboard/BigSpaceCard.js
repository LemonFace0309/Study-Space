import React from "react";
import { Paper, Container, Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function BigSpaceCard(props) {
  const theme = useTheme();
  const { title, description, startColor, endColor, textColor } = props;

  return (
    <Paper className="rounded-xl " elevate={5}>
      <Container
        className={`flex flex-row rounded-xl bg-gradient-to-r from-${startColor} to-${endColor} p-10 space-x-5 rounded-xl`}
      >
        <Box className="bg-gray-300 p-10"></Box>

        <Box className={`flex flex-col text-${textColor} space-y-3`}>
          <Typography variant="h5"> {title}</Typography>
          <Typography variant="body2"> {description}</Typography>
        </Box>
      </Container>
    </Paper>
  );
}
