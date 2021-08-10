import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: 'bold',
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: '20%/50%',
    margin: '10px',
    padding: '5px 20px',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.error.main,
    },
  },
}));

function LeaveCall({ leaveCall }) {
  const classes = useStyles();

  return (
    <div className="absolute top-0 right-0">
      <Button className={classes.button} onClick={leaveCall}>
        Quit
      </Button>
    </div>
  );
}

LeaveCall.propTypes = {
  leaveCall: PropTypes.func.isRequired,
};

export default LeaveCall;
