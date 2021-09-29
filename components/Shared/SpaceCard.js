import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

import SpaceCardContainer from './Card';

const useStyles = makeStyles((theme) => ({
  body: {
    color: theme.palette.primary.main,
  },
  icons: {
    color: theme.palette.primary.main,
  },
  footer: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
    flexBasis: 'auto',
    padding: theme.spacing(1),
    flexWrap: 'nowrap',
    '& > *': {
      transition: 'all 3s linear',
    },
  },
  footerWording: {
    paddingLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const SpaceCard = ({ isClickable, name, description, headCount, music }) => {
  const classes = useStyles();

  return (
    <SpaceCardContainer isClickable={isClickable}>
      <Grid container direction="column" className="h-full">
        <Grid item container direction="row" xs={12} className="p-4 flex-1">
          <Grid item xs={11} className={classes.body}>
            {/* Title and Description */}
            <Typography variant="h5" align="center">
              {name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {description}
            </Typography>
          </Grid>

          {/* Video, Mic, and Chat Icons */}
          <Grid item xs={1} className={classes.icons}>
            <VideocamOffIcon />
            <MicIcon />
            <ChatIcon />
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.footer}>
          <PeopleIcon />
          {headCount}
          <div className={classes.footerWording}>
            <LibraryMusicIcon />
            {music}
          </div>
        </Grid>
      </Grid>
    </SpaceCardContainer>
  );
};

SpaceCard.propTypes = {
  isClickable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  music: PropTypes.string,
};

export default SpaceCard;
