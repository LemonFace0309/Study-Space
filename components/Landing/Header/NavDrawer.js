import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GroupIcon from '@mui/icons-material/Group';
import ClearIcon from '@mui/icons-material/Clear';

const NavDrawer = ({ isOpen, setIsOpen, handleSignUp, handleLogIn }) => {
  const { t } = useTranslation();
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
                {t('LABEL_SIGNUP')}
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button className="py-6" onClick={() => handleLogIn()}>
            <ListItemText disableTypography>
              <Typography variant="body1" align="center">
                {t('LABEL_LOGIN')}
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
