import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
}));

const OurPicks = () => {
  const classes = useStyles();

  return (
    <div className="p-4">
      <Typography variant="subtitle2" className={classes.subtitle}>
        Lo-fi
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
      <Typography variant="subtitle2" className={classes.subtitle}>
        Nature
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
      <Typography variant="subtitle2" className={classes.subtitle}>
        Cafe Vibes
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
      <Typography variant="subtitle2" className={classes.subtitle}>
        Hip Hop
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
      <Typography variant="subtitle2" className={classes.subtitle}>
        Piano
      </Typography>
      <div className="d-flex mb-4 h-32 bg-gray-300" />
    </div>
  );
};

export default OurPicks;
