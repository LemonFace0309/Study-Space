import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useQuery, gql, useApolloClient } from '@apollo/client';

import {
  Button,
  Grid,
  Box,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import * as clientState from 'atoms/client';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    borderRadius: '1rem',
  },
  container: {
    padding: '2rem',
  },
  paper: {
    borderRadius: '50%',
  },
  containedPrimary: {
    background: theme.palette.primary.dark,
    borderRadius: '2rem',
    width: '100%',
  },
}));

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={uniqueId()}>
          <ListItemAvatar>
            <Avatar alt={user.avatar.alt} src={user.avatar.src}></Avatar>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body1" color="textPrimary">
                {user.name}
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="primary">
                {user.status}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
UserList.propTypes = {
  users: PropTypes.array.isRequired,
};
const SpaceCardModal = ({ handleClose, open, children, friends, participants, hosts, spaceId }) => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const [client, setClient] = useRecoilState(clientState.client);
  const [roomIsLoading, setRoomIsLoading] = useState(false);

  const gqlClient = useApolloClient();
  const GET_SESSION_USER = gql`
    query {
      users(name: "Eden Chan") {
        name
        email
        image
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_SESSION_USER);
  console.debug('data', data);

  const joinSpace = () => {
    // Add client to participant list
    setRoomIsLoading(true);
    console.debug('client', client);
    router.push(`/room/${spaceId}`);
  };
  return (
    <Dialog onClose={() => handleClose()} open={open} PaperProps={{ classes: { root: classes.dialogPaper } }}>
      <Grid container spacing={3} className={classes.container}>
        {/* Space Card */}
        <Grid item xs={12}>
          {children}
        </Grid>

        <Grid item container xs={12} spacing={3}>
          {/* Friends and Participants Section*/}
          <Grid item xs={12} sm={6}>
            <Box bgcolor={theme.palette.primary.extraLight} p="1rem" borderRadius="1rem">
              <Box color={theme.palette.text.bluegray} paddingLeft="1rem">
                <Typography variant="body1">Friends</Typography>
              </Box>
              <UserList users={friends} />
              <Box color={theme.palette.text.bluegray} paddingLeft="1rem">
                <Typography variant="body1">Participants</Typography>
              </Box>
              <UserList users={participants} />
            </Box>
          </Grid>

          {/* Host Section */}
          <Grid item xs={12} sm={6}>
            <Box p="1rem" borderRadius="1rem">
              <Box color={theme.palette.text.bluegray} paddingLeft="1rem">
                <Typography variant="body1">Host&#40;s&#41;</Typography>
              </Box>
              <UserList users={hosts} />
              <Button
                variant="contained"
                color="primary"
                className={classes.containedPrimary}
                // Add participant to the joined room
                onClick={() => {
                  joinSpace();
                }}>
                <ArrowForwardIcon /> Join Space
                {roomIsLoading && <CircularProgress />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

SpaceCardModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  friends: PropTypes.array,
  participants: PropTypes.array,
  hosts: PropTypes.array,
  spaceId: PropTypes.string.isRequired,
};

export default SpaceCardModal;
