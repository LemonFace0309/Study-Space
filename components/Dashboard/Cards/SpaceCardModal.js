import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
  const classes = useStyles();
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.name}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
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
const SpaceCardModal = ({ handleClose, open, children, friends, participants, hosts }) => {
  const theme = useTheme();
  const classes = useStyles();

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
              <Button variant="contained" color="primary" className={classes.containedPrimary}>
                <ArrowForwardIcon /> Join Space
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
};

export default SpaceCardModal;
