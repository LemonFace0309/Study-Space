import { createTheme, adaptV4Theme } from '@mui/material/styles';

// Ubuntu guide for weight
const light = 300;
const regular = 400;
const medium = 500;
const bold = 700;

export default createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        // purple
        extraLight: '#F8F7FB',
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
        dashboardGradient: 'linear-gradient(to bottom right, #E3BAC6, #E9D4DB)',
        mainGradient: 'linear-gradient(to right, #FAF3F5, #BDACD4)',
        contrastText: '#000', // black
      },
      text: {
        primary: '#111111', // black
        secondary: '#888888', // medium gray
        tertiary: '#616161', // dark gray
        disabled: '#C4C4C4', // light gray
        bluegray: '#607D8B', // blue gray
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
      h1: {
        fontWeight: medium,
        fontSize: '6rem',
      },
      h2: {
        fontWeight: medium,
        fontSize: '3.75rem',
      },
      h3: {
        fontWeight: medium,
        fontSize: '3rem',
      },
      h4: {
        fontWeight: medium,
        fontSize: '2.125rem',
      },
      h5: {
        fontWeight: medium,
        fontSize: '1.5rem',
      },
      h6: {
        fontWeight: medium,
        fontSize: '1.25rem',
      },
      subtitle1: {
        fontWeight: medium,
        fontSize: '1.125rem',
      },
      subtitle2: {
        fontWeight: medium,
        fontSize: '0.875rem',
      },
      body1: {
        fontWeight: regular,
        fontSize: '1rem',
      },
      body2: {
        fontWeight: regular,
        fontSize: '0.875rem',
      },
      button: {
        fontWeight: medium,
        fontSize: '1rem',
      },
      caption: {
        fontWeight: regular,
        fontSize: '0.75rem',
      },
      overline: {
        fontWeight: bold,
        fontSize: '0.875rem',
      },
    },
  })
);
