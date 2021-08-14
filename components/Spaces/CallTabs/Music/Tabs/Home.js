import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useSpotify } from '../SpotifyProvider';
import Playlist from '../Playlist';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
}));

const SpotifyHome = () => {
  const { user, userPlaylists } = useSpotify();
  const classes = useStyles();

  return (
    <div className="p-4">
      <Typography variant="h6" className={classes.heading}>
        <span role="img" aria-label="wave emoji">
          👋
        </span>{' '}
        Hello {user?.display_name}
      </Typography>
      <Typography variant="subtitle2" className={classes.heading}>
        Your Playlists
      </Typography>
      <Grid container alignItems="flex-start">
        {userPlaylists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </Grid>
      <Typography variant="subtitle2" className={classes.heading}>
        Nature
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
      <Typography variant="subtitle2" className={classes.heading}>
        Cafe Vibes
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
      <Typography variant="subtitle2" className={classes.heading}>
        Hip Hop
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
      <Typography variant="subtitle2" className={classes.heading}>
        Piano
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
    </div>
  );
};

export default SpotifyHome;
