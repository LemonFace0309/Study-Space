import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import {
  Button,
  Grid,
  Box,
  Typography,
  Dialog as MUIDialog,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const JoinButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.dark,
  borderRadius: '2rem',
  whiteSpace: 'nowrap',
}));

const Dialog = styled(MUIDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
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
    <Dialog onClose={() => handleClose()} open={open}>
      <Box sx={{ p: 4 }}>
        <Grid container>
          {/* Space Card */}
          <Grid item xs={12} style={{ marginBottom: '24px' }}>
            {children}
          </Grid>

          <Grid item container xs={12} spacing={3}>
            {/* Friends and Participants Section*/}
            <Grid item xs={12} sm={6}>
              <Box sx={{ bgcolor: 'priamry.extraLight', p: 2, borderRadius: '2' }}>
                <Box sx={{ color: 'text.bluegray', pl: 2 }}>
                  <Typography variant="body1">{t('LABEL_FRIENDS')}</Typography>
                </Box>
                <UserList users={friends} />
                <Box sx={{ color: 'text.bluegray', pl: 2 }}>
                  <Typography variant="body1">{t('LABEL_PARTICIPANTS')}</Typography>
                </Box>

                {!loading && <UserList users={allParticipants} />}
              </Box>
            </Grid>

            {/* Host Section */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ color: 'text.bluegray', pl: 2 }}>
                  <Typography variant="body1">{t('LABEL_HOST')}</Typography>
                </Box>
                {hData && <UserList users={hData.hostsInSpace} />}
                <JoinButton variant="contained" color="primary" startIcon={<ArrowForwardIcon />} onClick={joinSpace}>
                  {joiningSpace && <CircularProgress />}
                  {t('LABEL_JOIN_SPACE')}
                </JoinButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
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
