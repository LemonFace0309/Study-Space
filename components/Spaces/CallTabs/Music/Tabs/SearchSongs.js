import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import getClosestImageSize from 'utils/spotify/getClosestImageSize';
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
  const { accessToken, spotifyApi, setQueue } = useSpotify();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = getClosestImageSize(track.album.images, 64);

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  const playTrack = (track) => {
    setSearchResults([]);
    setQueue([track]);
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
          searchResults.map((track) => <Track key={track.uri} track={track} playTrack={playTrack} />)
        )}
      </div>
    </div>
  );
};

export default SearchSongs;
