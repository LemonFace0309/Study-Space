import PropTypes from 'prop-types';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import Card from './Card';

const SpaceCard = ({ spaceName, description, headCount, music }) => {
  const theme = useTheme();
  return (
    <Card>
      <Grid container direction="column">
        <Grid item container direction="row">
          <Grid item xs={11}>
            {/* Title and Description */}
            <Box color={theme.palette.primary.dark} p={3}>
              <Typography variant="h5" align="center">
                {spaceName}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {description}
              </Typography>
            </Box>
          </Grid>

          {/* Video, Mic, and Chat Icons */}

          <Grid item xs={1}>
            <Box
              color={theme.palette.primary.main}
              className=" flex items-center justify-center flex-col m-1 bg-opacity-30">
              <VideocamOffIcon />
              <MicIcon />
              <ChatIcon />
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <Box
            bgcolor={theme.palette.primary.light}
            color={theme.palette.primary.main}
            className="flex flex-row text-sm rounded-bl-xl rounded-br-xl p-2 space-x-2">
            <Box>
              <PeopleIcon />
              {headCount}
            </Box>
            <Box>
              <LibraryMusicIcon />
              {music}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

SpaceCard.propTypes = {
  spaceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  music: PropTypes.string.isRequired,
};

export default SpaceCard;
