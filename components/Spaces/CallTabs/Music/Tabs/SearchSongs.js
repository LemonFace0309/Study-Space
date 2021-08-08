import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <div className="p-4 h-full flex flex-col">
      <Alert severity="info" className="w-full py-2 mt-2 mb-4">
        We’ll fetch Spotify search result and add that to the queue.
      </Alert>
      <Typography variant="subtitle2" className={classes.primaryText}>
        Song Search
      </Typography>
      <div className={classes.inputControl}>
        <InputBase className="w-full" placeholder="Enter your song here" />
      </div>
      <Divider className="mt-4 mb-8" />
      <div className="flex-1 overflow-y-auto">
        <Typography variant="body2" className={classes.emptySearch}>
          Search result will show up here
        </Typography>
        <h1>songs</h1>
      </div>
    </div>
  );
};

export default SearchSongs;
