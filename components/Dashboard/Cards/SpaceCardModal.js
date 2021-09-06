import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import uniqueId from 'lodash/uniqueId';
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

import * as userState from 'atoms/user';

const ADD_USER_TO_SPACE = gql`
  mutation AddUserToSpaceMutation($addUserToSpaceInput: AddUserToSpaceInput!) {
    addUserToSpace(input: $addUserToSpaceInput) {
      participants {
        _id
        name
        image
      }
      name
      spaceId
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  container: {
    padding: '2rem',
  },
  containedPrimary: {
    background: theme.palette.primary.dark,
    borderRadius: '2rem',
    whiteSpace: 'nowrap',
    // width: '100%',
  },
}));

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={uniqueId()}>
          <ListItemAvatar>
            <Avatar alt="profile image" src={user?.image}></Avatar>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body1" color="textPrimary">
                {user?.name}
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="primary">
                {user?.status}
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
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const client = useRecoilValue(userState.user);
  const [roomIsLoading, setRoomIsLoading] = useState(false);
  const [addUserToSpace] = useMutation(ADD_USER_TO_SPACE);

  const joinSpace = async () => {
    // Add client to participant list
    setRoomIsLoading(true);
    const addUserToSpaceInput = {
      userId: client?.user?._id ?? '',
      spaceId,
    };
    try {
      const result = await addUserToSpace({ variables: { addUserToSpaceInput } });
      console.debug('Joining Space:', result);
      router.push(`/room/${spaceId}`);
    } catch (err) {
      console.warn('Unable to join space:', err);
    }
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
                <Typography variant="body1">{t('LABEL_FRIENDS')}</Typography>
              </Box>
              <UserList users={friends} />
              <Box color={theme.palette.text.bluegray} paddingLeft="1rem">
                <Typography variant="body1">{t('LABEL_PARTICIPANTS')}</Typography>
              </Box>

              <UserList users={participants} />
            </Box>
          </Grid>

          {/* Host Section */}
          <Grid item xs={12} sm={6}>
            <Box p="1rem" borderRadius="1rem">
              <Box color={theme.palette.text.bluegray} paddingLeft="1rem">
                <Typography variant="body1">{t('LABEL_HOST')}</Typography>
              </Box>
              <UserList users={hosts} />
              <Button
                variant="contained"
                color="primary"
                className={classes.containedPrimary}
                startIcon={<ArrowForwardIcon />}
                onClick={joinSpace}>
                {t('LABEL_JOIN_SPACE')}
                {roomIsLoading && <CircularProgress className="ml-2" />}
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
