import PropTypes from 'prop-types';
import {
  Container,
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
        <ListItem key={user.name} className="py-0">
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
  users: PropTypes.object,
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
      <Box className="p-10 rounded-lg">
        {children}

        <Typography
          variant="h6"
          color="textSecondary"
          className="uppercase py-4">
          In Session
        </Typography>

        <Container className="flex flex-col sm:flex-row justify-between  ">
          <Box
            bgcolor={theme.palette.primary.light}
            className="flex flex-col p-5 rounded-lg">
            <Typography variant="body1" color="textSecondary">
              Friends
            </Typography>
            <UserList users={friends} />

            <Typography variant="body1" color="textSecondary">
              Participants
            </Typography>
            <UserList users={participants} />
          </Box>

          <Box className="flex flex-col p-5">
            <Typography variant="body1" color="textSecondary">
              Host&#40;s&#41;
            </Typography>
            <UserList users={hosts} />
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
};

SpaceCardModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.func,
  children: PropTypes.element,
  friends: PropTypes.object,
  participants: PropTypes.object,
  hosts: PropTypes.object,
};

export default SpaceCardModal;
