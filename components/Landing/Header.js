import React from 'react';
import classNames from 'classnames';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props) => {
  // using classNames so it's easy to change when making responsive
  const menuItemStyles = classNames([
    'mx-2',
    'outline-none',
    'hover:text-gray-500',
    'transition duration-200 ease-in-out',
  ]);
  const authButtons = classNames([
    'normal-case',
    'px-10',
    'm-2',
    'rounded-full',
    'outline-none',
  ]);

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="sticky" className="bg-white text-gray-600 pt-2">
          <Toolbar>
            <IconButton
              edge="start"
              className="mr-2 outline-none"
              color="inherit"
              aria-label="menu">
              <MenuIcon />
            </IconButton>
            <div className="flex-grow">
              <button variant="h6" className={menuItemStyles}>
                Just You
              </button>
              <button variant="h6" className={menuItemStyles}>
                With Friends
              </button>
              <button variant="h6" className={menuItemStyles}>
                Large Groups
              </button>
            </div>
            <Button
              color="inherit"
              className={authButtons}
              style={{
                border: '1.5px solid rgba(107, 114, 128)',
              }}>
              Sign Up
            </Button>
            <Button
              color="inherit"
              className={authButtons}
              style={{
                border: '1.5px solid rgba(107, 114, 128)',
              }}>
              Log in
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
