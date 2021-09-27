import PropTypes from 'prop-types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRecoilValue } from 'recoil';
import { Container, Grid, Typography, Button, Hidden } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import * as userState from 'atoms/user';
import router from 'next/router';

const Hero = ({ setAuthDialogOpen }) => {
  const { t } = useTranslation();
  const session = useRecoilValue(userState.session);

  const tryItYourselfHandler = () => {
    if (session) {
      router.push('dashboard');
    } else {
      setAuthDialogOpen(true);
    }
  };

  return (
    <Container maxWidth="xl" className="flex-grow flex items-stretch">
      <Grid container direction="row" className="items-center p-2" spacing={3}>
        <Grid item xs={12} md={6} className="flex flex-col h-full justify-between items-start py-12">
          <Typography variant="body1"> {t('LABEL_HEY_THERE')} </Typography>
          <div>
            <Typography variant="h4">{t('LABEL_YOUR_AROMIA')}</Typography>
            <Typography variant="subtitle1">{t('LABEL_INCREASE_PROD')}</Typography>
          </div>
          <div>
            <Button
              onClick={tryItYourselfHandler}
              className="normal-case px-10 m-2 rounded-full outline-none text-white bg-gray-500 hover:bg-gray-600"
              style={{
                border: '1.5px solid rgba(107, 114, 128)',
              }}>
              {t('LABEL_TRY_IT_YOURSELF')}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                !session && setAuthDialogOpen(true);
              }}
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
          <Grid item xs={6} className="relative h-full flex justify-center items-center">
            <Image src="/images/landing/hero.svg" alt="Hero" className="max-h-96" layout="fill" />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

Hero.propTypes = {
  setAuthDialogOpen: PropTypes.func.isRequired,
};

export default Hero;
