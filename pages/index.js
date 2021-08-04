import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  return <h1>WELCOME :D</h1>;
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
