import Typography from '@mui/material/Typography';
import { shuffle } from 'lodash';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';

import { useSpotifyContext } from '@/context/spaces/SpotifyContext';
import parseTracks from '@/utils/spotify/parseTracks';
import Playlist from '../Playlist';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  songGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 112px)',
    gridGap: '1rem',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
}));

const SpotifyHome = () => {
  const {
    spotifyApi,
    user,
    setQueue,
    userPlaylists,
    focusPlaylists,
    kpopPlaylsits,
    cafePlaylists,
    studyPlaylists,
    pianoPlaylists,
  } = useSpotifyContext();
  const playLists = [
    { name: 'Your Playlists ✨', playlistObj: userPlaylists },
    { name: 'Focus 📜', playlistObj: focusPlaylists },
    { name: 'K-Pop 👨‍🎤', playlistObj: kpopPlaylsits },
    { name: 'Cafe Vibes ☕', playlistObj: cafePlaylists },
    { name: 'Study Vibes 📚', playlistObj: studyPlaylists },
    { name: 'Piano Music 🎹', playlistObj: pianoPlaylists },
  ];
  const classes = useStyles();

  const playPlaylist = async (playlist) => {
    try {
      const data = await spotifyApi.getPlaylistTracks(playlist.id, {
        // offset: 1,
        limit: 50,
        fields: 'items',
      });
      const tracks = data.body.items.map((item) => item.track);
      const shuffledTracks = shuffle(tracks);
      setQueue(parseTracks(shuffledTracks));
    } catch (err) {
      console.debug('Something went wrong!', err);
    }
  };

  const renderPlaylist = (name, playlistObj) => {
    return (
      <div key={name} className="mt-2">
        <Typography variant="subtitle2" className={classes.heading}>
          {name}
        </Typography>
        <Grid container className={classes.songGrid}>
          {playlistObj.map((playlist) => (
            <Playlist key={playlist.id} playlist={playlist} playPlaylist={playPlaylist} />
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
