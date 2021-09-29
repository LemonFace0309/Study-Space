import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '9999px',
    margin: '10px',
    padding: '5px 20px',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonFill: {
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '9999px',
    margin: '10px',
    padding: '5px 20px',
    '&:hover': {
      color: theme.palette.primary.dark,
      backgroundColor: 'white',
    },
  },
}));

function LeaveCallButton({ fn, text, fillBackground }) {
  const classes = useStyles();

  return (
    <Button className={fillBackground ? classes.buttonFill : classes.button} onClick={fn}>
      {text}
    </Button>
  );
}

LeaveCallButton.propTypes = {
  fn: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  fillBackground: PropTypes.bool.isRequired,
};

export default LeaveCallButton;
