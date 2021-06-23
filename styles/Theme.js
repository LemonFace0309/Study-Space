import { createMuiTheme } from '@material-ui/core/styles';

// Ubuntu guide for weight
const light = 300;
const regular = 400;
const medium = 500;
const bold = 700;

export default createMuiTheme({
  palette: {
    primary: {
      // purple
      light: '#BDACD4',
      main: '#977BBF',
      dark: '#4E3276',
      mainGradient: 'linear-gradient(to right, #4E3276, #977BBF)',
      contrastText: '#fff', // white,
    }, 
    secondary: {
      // pink
      light: '#FAF3F5',
      main: '#E3BAC6',
      mainGradient: 'linear-gradient(to right, #FAF3F5, #BDACD4)',
      contrastText: '#000', // black
    },

    text: {
      primary: '#111111', // black
      secondary: '#888888', // medium gray
      disabled: '#C4C4C4', // light gray 
    },

    error: {
      // red
      main: '#EF5D66',
    },
    /* success causes error so I'm leaving it out for now
    success: {
      // green
      main: "1DD1A1",
    }, */
    action: {
      active: '#4E3276',
      hover: '#977BBF',
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },

  button: {
    backgroundColor: 'transparent',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#977BBF',
      color: '#fff',
    },
  },
});
