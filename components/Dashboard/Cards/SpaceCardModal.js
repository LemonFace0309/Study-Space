import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Box,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  useTheme,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.name}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.status} />
        </ListItem>
      ))}
    </List>
  );
};
UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

const SpaceCardModal = ({
  handleClose,
  open,
  children,
  friends,
  participants,
  hosts,
}) => {
  const theme = useTheme();

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <Container>
        <Grid container spacing={3}>
          {/* Space Card */}
          <Grid item xs={12}>
            {children}
          </Grid>

          <Grid item container xs={12} spacing={3}>
            {/* Friends and Participants Section*/}
            <Grid item xs={12} sm={6}>
              <Box bgcolor={theme.palette.primary.light}>
                <Typography variant="body1" color="textSecondary">
                  Friends
                </Typography>
                <UserList users={friends} />

                <Typography variant="body1" color="textSecondary">
                  Participants
                </Typography>
                <UserList users={participants} />
              </Box>
            </Grid>

            {/* Host Section */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  Host&#40;s&#41;
                </Typography>
                <UserList users={hosts} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
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
};

export default SpaceCardModal;
