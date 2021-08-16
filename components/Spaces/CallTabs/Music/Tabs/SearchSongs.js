import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import parseTracks from 'utils/spotify/parseTracks';
import Track from '../Track';
import { useSpotify } from '../SpotifyProvider';

const useStyles = makeStyles((theme) => ({
  primaryText: {
    color: theme.palette.primary.dark,
  },
  inputControl: {
    width: '100%',
    borderRadius: '9999px',
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 4),
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(17, 17, 17, 0.04)',
  },
  emptySearch: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const SearchSongs = () => {
  const classes = useStyles();
  const { accessToken, spotifyApi, setQueue, setOffset, currentTrack, setCurrentTrack, nextTracks, setNextTracks } =
    useSpotify();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(parseTracks(res.body.tracks.items));
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  const playTrack = (track) => {
    setSearchResults([]);
    setQueue((prev) => {
      let newQueue = [];
      if (prev.length === 0) {
        newQueue.push(track);
      } else {
        // spotify player has bug with setting a new queue if it's the same length.
        // This is an inperfect workaround to make sure the song changes.
        newQueue = [track, currentTrack, ...nextTracks];
      }
      return newQueue;
    });
  };

  const addToQueue = (track) => {
    let newQueue = [];
    setQueue((prev) => {
      newQueue = [...prev];
      newQueue.push(track);
      return newQueue;
    });
    if (newQueue.length <= 1) {
      setCurrentTrack(track);
    } else {
      setNextTracks((prev) => {
        const newNextTrack = [...prev];
        newNextTrack.push(track);
        return newNextTrack;
      });
    }
  };

  return (
    <div className="p-4 overflow-y-auto h-full flex flex-col">
      <Alert severity="info" className="w-full py-2 mt-2 mb-4">
        We’ll fetch Spotify search result and add that to the queue.
      </Alert>
      <Typography variant="subtitle2" className={classes.primaryText}>
        Song Search
      </Typography>
      <div className={classes.inputControl}>
        <InputBase
          className="w-full"
          placeholder="Enter your song here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Divider className="mt-4 mb-8" />
      <div className="flex-1 overflow-y-auto">
        {searchResults.length === 0 ? (
          <Typography variant="body2" className={classes.emptySearch}>
            Search result will show up here
          </Typography>
        ) : (
          searchResults.map((track) => (
            <Track key={track.uri} track={track} playTrack={playTrack} addToQueue={addToQueue} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchSongs;
