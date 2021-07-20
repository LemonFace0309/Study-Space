import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GroupIcon from '@material-ui/icons/Group';
import ClearIcon from '@material-ui/icons/Clear';

const NavDrawer = ({ isOpen, setIsOpen, handleSignUp, handleLogIn }) => {
  const content = (
    <div className="h-full flex flex-col">
      <div
        className="w-64 flex-grow"
        role="presentation"
        onClick={() => setIsOpen(false)}
        onKeyDown={() => setIsOpen(false)}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Just you" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary="With Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Large Groups" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button className="py-6" onClick={() => handleSignUp()}>
            <ListItemText disableTypography>
              <Typography variant="body1" align="center">
                Sign Up
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button className="py-6" onClick={() => handleLogIn()}>
            <ListItemText disableTypography>
              <Typography variant="body1" align="center">
                Log In
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </div>
      <div>
        <ListItem button className="py-8 hover:bg-red-500" onClick={() => setIsOpen(false)}>
          <ListItemIcon className="m-auto min-w-0">
            <ClearIcon fontSize="large" color="secondary" />
          </ListItemIcon>
        </ListItem>
      </div>
    </div>
  );

  return (
    <SwipeableDrawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)}>
      {content}
    </SwipeableDrawer>
  );
};

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  handleLogIn: PropTypes.func.isRequired,
};

export default NavDrawer;
