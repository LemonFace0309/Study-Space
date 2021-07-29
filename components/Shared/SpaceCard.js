import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

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
  music: PropTypes.string.isRequired,
};

export default SpaceCard;
