import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { useRouter } from 'next/router';
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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery, gql } from '@apollo/client';

const GET_REGISTERED_PARTICIPANTS_IN_SPACE = gql`
  query GetRegisteredParticipantsInSpace($spaceId: ID!) {
    registeredParticipantsInSpace(spaceId: $spaceId) {
      _id
      image
      username
      name
      # status
    }
  }
`;

const GET_HOSTS_FROM_SPACE = gql`
  query GetHostsFromSpace($spaceId: ID!) {
    hostsInSpace(spaceId: $spaceId) {
      _id
      image
      username
      name
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
        <ListItem key={user?._id ?? uniqueId()}>
          <ListItemAvatar>
            <Avatar alt="profile image" src={user?.image}></Avatar>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body1" color="textPrimary">
                {user?.username || user?.name}
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

const SpaceCardModal = ({ handleClose, open, children, friends, participants, spaceId }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();

  const { data: pData } = useQuery(GET_REGISTERED_PARTICIPANTS_IN_SPACE, { variables: { spaceId } });
  const { data: hData } = useQuery(GET_HOSTS_FROM_SPACE, { variables: { spaceId } });
  const [loading, setLoading] = useState(true);
  const [joiningSpace, setJoiningSpace] = useState(false);
  const [allParticipants, setAllParticipants] = useState([]);

  useEffect(() => {
    if (!pData) return;
    const guests = participants.filter((p) => !p.userId);
    setAllParticipants([...guests, ...pData.registeredParticipantsInSpace]);
    setLoading(false);
  }, [participants, pData]);

  const joinSpace = async () => {
    setJoiningSpace(true);
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
                <Typography variant="body1">{t('LABEL_FRIENDS')}</Typography>
              </Box>
              <UserList users={friends} />
              <Box color={theme.palette.text.bluegray} paddingLeft="1rem">
                <Typography variant="body1">{t('LABEL_PARTICIPANTS')}</Typography>
              </Box>

              {!loading && <UserList users={allParticipants} />}
            </Box>
          </Grid>

          {/* Host Section */}
          <Grid item xs={12} sm={6}>
            <Box p="1rem" borderRadius="1rem">
              <Box color={theme.palette.text.bluegray} paddingLeft="1rem">
                <Typography variant="body1">{t('LABEL_HOST')}</Typography>
              </Box>
              {hData && <UserList users={hData.hostsInSpace} />}
              <Button
                variant="contained"
                color="primary"
                className={classes.containedPrimary}
                startIcon={<ArrowForwardIcon />}
                onClick={joinSpace}>
                {joiningSpace && <CircularProgress />}
                {t('LABEL_JOIN_SPACE')}
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
  spaceId: PropTypes.string.isRequired,
};

export default SpaceCardModal;
