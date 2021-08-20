import { useTranslation } from 'next-i18next';
import { Container, Grid, Typography, Button, Hidden } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

<<<<<<< HEAD
const Hero = () => {
  const { t } = useTranslation();
=======
const hero = () => {
  // const { t } = useTranslation();
>>>>>>> 6bb537b0f5473a362371d8b853a12dd8a58c7eec
  return (
    <Container maxWidth="xl" className="flex-grow flex items-stretch">
      <Grid container direction="row" className="items-center p-2" spacing={3}>
        <Grid item xs={12} md={6} className="flex flex-col h-full justify-between items-start py-12">
<<<<<<< HEAD
          <Typography variant="body1"> {t('LABEL_HEY_THERE')} </Typography>
          <div>
            <Typography variant="h4">{t('LABEL_YOUR_AROMIA')}</Typography>
            <Typography variant="subtitle1">{t('LABEL_INCREASE_PROD')}</Typography>
=======
          <Typography variant="body1">Hey there! Let us welcome you to</Typography>
          <div>
            <Typography variant="h4">Your aromia filled table at Starbucks.</Typography>
            <Typography variant="subtitle1">
              Increase your productivity with virtual spaces customized to your liking.
            </Typography>
>>>>>>> 6bb537b0f5473a362371d8b853a12dd8a58c7eec
          </div>
          <div>
            <Button
              className="normal-case px-10 m-2 rounded-full outline-none text-white bg-gray-500 hover:bg-gray-600"
              style={{
                border: '1.5px solid rgba(107, 114, 128)',
              }}>
              {t('LABEL_TRY_IT_YOURSELF')}
            </Button>
            <Button
              color="inherit"
              className="normal-case px-10 m-2 rounded-full outline-none"
              style={{
                border: '1.5px solid rgba(107, 114, 128)',
              }}>
              {t('LABEL_CREATE_A_SPACE')}
            </Button>
          </div>
          <Button endIcon={<ArrowDownwardIcon />} className="normal-case outline-none">
            See what you can do with XXX
          </Button>
        </Grid>
        <Hidden smDown>
          <Grid item xs={6} className="flex justify-center items-center">
            <img src="/images/placeholder.jpg" alt="Hero" className="max-h-96" />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default Hero;
