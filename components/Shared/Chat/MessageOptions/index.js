import { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';

const MessageOptions = ({ selectedIndex, setSelectedIndex, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Message settings" sx={{ bgcolor: 'background.paper' }}>
        <ListItem button aria-expanded={open ? 'true' : undefined} onClick={handleClickListItem}>
          <ListItemText
            primary="Message Options"
            secondary={selectedIndex == null ? 'Everyone' : options[selectedIndex]?.username}
          />
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          role: 'listbox',
        }}>
        <MenuItem selected={selectedIndex == null} onClick={() => handleMenuItemClick(null)}>
          Everyone
        </MenuItem>
        <Divider />
        {options.map((person, index) => (
          <MenuItem key={person.socketId} selected={index === selectedIndex} onClick={() => handleMenuItemClick(index)}>
            {person.username}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

MessageOptions.propTypes = {
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      socketId: PropTypes.string.isRequired,
    })
  ),
};

export default MessageOptions;
