import PropTypes from 'prop-types';
import { Dialog, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.dark,
  },
}));

const CreateSpaceDialog = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      classes={{ paper: 'rounded-xl p-4' }}
      onClose={() => setOpen(false)}
      aria-labelledby="Create Space Dialog">
      <Grid container className="my-2" alignItems="center" direction="row">
        <Typography variant="h4" className={classes.title}>
          Create a new space
        </Typography>
      </Grid>
    </Dialog>
  );
};

CreateSpaceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CreateSpaceDialog;
