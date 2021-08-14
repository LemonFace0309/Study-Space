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
  const { user, userPlaylists, focusPlaylists, kpopPlaylsits, cafePlaylists, studyPlaylists, pianoPlaylists } =
    useSpotify();
  const playLists = [
    { name: 'Your Playlists ✨', playlistObj: userPlaylists },
    { name: 'Focus 📜', playlistObj: focusPlaylists },
    { name: 'K-Pop 👨‍🎤', playlistObj: kpopPlaylsits },
    { name: 'Cafe Vibes ☕', playlistObj: cafePlaylists },
    { name: 'Study Vibes 📚', playlistObj: studyPlaylists },
    { name: 'Piano Music 🎹', playlistObj: pianoPlaylists },
  ];
  const classes = useStyles();

  const renderPlaylist = (name, playlistObj) => {
    return (
      <div key={name}>
        <Typography variant="subtitle2" className={classes.heading}>
          {name}
        </Typography>
        <Grid container alignItems="flex-start">
          {playlistObj.map((playlist) => (
            <Playlist key={playlist.id} playlist={playlist} />
          ))}
        </Grid>
      </div>
    );
  };

  return (
    <div className="p-4">
      <Typography variant="h6" className={classes.heading}>
        <span role="img" aria-label="wave emoji">
          👋
        </span>{' '}
        Hello {user?.display_name}
      </Typography>
      {playLists.map(({ name, playlistObj }) => renderPlaylist(name, playlistObj))}
    </div>
  );
};

export default SpotifyHome;
