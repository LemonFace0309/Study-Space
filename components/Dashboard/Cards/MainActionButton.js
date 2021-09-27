import PropTypes from 'prop-types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Typography, Grid, Hidden, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../../Shared/Card';

const useStyles = makeStyles((theme) => ({
  container: {
    background: ({ variant }) => {
      return variant === 'dark' ? theme.palette.primary.mainGradient : theme.palette.secondary.mainGradient;
    },
    height: '100%',
    width: '100%',
    flexWrap: 'nowrap',
    padding: '2rem',
  },
  text: {
    color: ({ variant }) => {
      return variant === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.dark;
    },
  },
}));

const MainActionButton = ({ name, img, description, variant, loading, onClick }) => {
  const { t } = useTranslation();
  const classes = useStyles({ variant });

  return (
    <Card isClickable={true} onClick={onClick}>
      <Grid container direction="row" className={classes.container}>
        <Hidden smDown>
          <Image src={img} height="200" width="250" />
        </Hidden>

        <div className={classes.text}>
          <Typography variant="h4">{t(name)}</Typography>
          <Typography variant="body1">{description}</Typography>
          {loading && <CircularProgress className="p-4" size="6rem" color="secondary" />}
        </div>
      </Grid>
    </Card>
  );
};

MainActionButton.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

MainActionButton.defaultProps = {
  loading: false,
  onClick: () => null,
};

export default MainActionButton;
