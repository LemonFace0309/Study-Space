import React from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import PhotoIcon from "@material-ui/icons/Photo";

export default function JoinCard(props) {
  const theme = useTheme();
  const { spaceName, description } = props;
  return (
    <div>
      <Box
        style={{ background: theme.palette.secondary.mainGradient }}
        className="flex flex-grow justify-between rounded-r-xl rounded-bl-xl "
      >
        <div class="h-32 w-80 grid grid-cols-3">
          <div class="p-6">
            {/* spaceholder */}
            <Box class="h-20 w-20 bg-purple-200"></Box>
          </div>
          <div class="col-span-2 pt-2">
            <Box className="text-left p-3">
              <Typography color="text" variant="h5" align="left">
                {spaceName}
              </Typography>
              <Typography variant="body1" className="text-sm pt-1">
                {description}
              </Typography>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
}