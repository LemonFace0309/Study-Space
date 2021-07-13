import PropTypes from 'prop-types';
import { Grid, Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import Card from './Card';

const SpaceCard = ({ isClickable, spaceName, description, headCount, music }) => {
  const theme = useTheme();
  return (
    <Card isClickable={isClickable}>
      <Grid container direction="column">
        <Grid item container direction="row" xs={12}>
          <Grid item xs={11}>
            {/* Title and Description */}
            <Box color={theme.palette.primary.dark}>
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
            <Box color={theme.palette.primary.main}>
              <VideocamOffIcon />
              <MicIcon />
              <ChatIcon />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" justifyContent="flex-end">
            <Box
              display="flex"
              flexDirection="row"
              p={1}
              bgcolor={theme.palette.primary.light}
              color={theme.palette.primary.main}>
              <Box>
                <PeopleIcon />
                {headCount}
              </Box>
              <Box>
                <LibraryMusicIcon />
                {music}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

SpaceCard.propTypes = {
  isClickable: PropTypes.bool,
  spaceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  music: PropTypes.string.isRequired,
};

export default SpaceCard;
