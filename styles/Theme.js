import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      // purple
      light: '#BDACD4',
      main: '#977BBF',
      dark: '#4E3276',
      mainGradient: 'linear-gradient(to right, #4E3276, #977BBF)',
      contrastText: '#fff', // white
    },
    secondary: {
      // pink
      light: '#FAF3F5',
      main: '#E3BAC6',
      mainGradient: 'linear-gradient(to right, #FAF3F5, #BDACD4)',
      contrastText: '#000', // black
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
    subtitle1: {
      fontWeight: 500,
      fontSize: '20px',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '14px',
    },
    h1: {
      // title
      fontWeight: 500,
      fontSize: '30px',
      lineHeight: 2,
      letterSpacing: '-0.00833em',
      color: '#616161',
    },
    h2: {
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      color: '#FFF',
    },
    h3: {
      fontWeight: 300,
      fontSize: '14px',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      color: '#888888',
    },
    body1: {
      color: '#FFF',
    },
    allVariants: {
      fontFamily: 'Ubuntu',
      color: '#BDACD4',
    },
  },

  button: {
    backgroundColor: 'transparent',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#977BBF',
      color: '#fff',
    },
  },
})
