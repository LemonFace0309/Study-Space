import PropTypes from 'prop-types';
import { Grid, Dialog, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import LeaveCallButton from './LeaveCallButton';

const LeaveCallDialog = ({ open, setOpen, leaveCall }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" className="p-5">
      <Grid className="p-5 flex flex-col align-items-center justify-items-center">
        <Typography
          variant="h4"
          component="h1"
          style={{ color: theme.palette.primary.dark }}
          className="font-bold my-4">
          Leaving so soon?
        </Typography>
        <p className="my-4">
          You still have items left on your to-do. Do you want to leave without finishing the session?
        </p>
        <div className="flex justify-end w-100">
          <LeaveCallButton fn={() => setOpen(false)} text="Cancel" fillBackground={false} />
          <LeaveCallButton fn={leaveCall} text="Leave Session" fillBackground={true} />
        </div>
      </Grid>
    </Dialog>
  );
};

LeaveCallDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  leaveCall: PropTypes.func.isRequired,
};

export default LeaveCallDialog;
