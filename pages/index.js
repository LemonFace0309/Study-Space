import PropTypes from 'prop-types';
import { getProviders, signIn, signOut, getSession } from 'next-auth/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from 'components/Landing/Header/index';
import Hero from 'components/Landing/Hero';
import LandingSpaces from 'components/Landing/LandingSpaces';
import BigFeature, { DIRECTIONS } from 'components/Landing/BigFeature';
import BigStats from 'components/Landing/BigStats';
import SmallFeatures from 'components/Landing/SmallFeatures';
import Footer from 'components/Landing/Footer';

const Landing = ({ data, bigFeatures, stats, smallFeatures, providers }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header providers={providers} signIn={signIn} signOut={signOut} getSession={getSession} />
        <Hero />
      </div>
      <LandingSpaces data={data} />
      {bigFeatures.map((feature, index) => (
        <BigFeature
          key={index}
          title={feature.title}
          body={feature.body}
          img={feature.img}
          direction={index % 2 ? DIRECTIONS.BACKWARDS : DIRECTIONS.FORWARDS}
        />
      ))}
      <BigStats stats={stats} />
      <SmallFeatures features={smallFeatures} />
      <Footer />
    </>
  );
};

Landing.propTypes = {
  providers: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  bigFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  smallFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const getStaticProps = async ({ locale }) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
      ...(await serverSideTranslations(locale, ['common'])),
      data: [
        {
          name: 'UW Math 2025',
          description: 'finals grind, upper years available in chat for help with past exams',
          headCount: '17',
          music: 'lofi 2',
        },
        {
          name: "Capstone Grind '25",
          description: 'writing your report, making your presentation, setting up data',
          headCount: '23',
          music: 'cafe beats eng edition F21',
        },
        {
          name: 'UW Math 2025',
          description: '3rd and 4th years offering help in MSCI, GENE, MATH, and CS',
          headCount: '8',
          music: 'none',
        },
      ],
      bigFeatures: [
        {
          title: 'Customizable Spaces',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque nec egestas rutrum eu tincidunt ante nulla. Consectetur pellentesque imperdiet condimentum gravida purus.',
          img: '/images/placeholder.jpg',
        },
        {
          title: 'Virtual study enhancements',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque nec egestas rutrum eu tincidunt ante nulla. Consectetur pellentesque imperdiet condimentum gravida purus.',
          img: '/images/placeholder.jpg',
        },
        {
          title: 'Communities of students',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque nec egestas rutrum eu tincidunt ante nulla. Consectetur pellentesque imperdiet condimentum gravida purus.',
          img: '/images/placeholder.jpg',
        },
      ],
      stats: [
        {
          score: '99%',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis...',
        },
        {
          score: 12,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis...',
        },
        {
          score: '9 / 12',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis...',
        },
      ],
      smallFeatures: [
        {
          title: 'Communities of students',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque... ',
          img: '/images/placeholder.jpg',
        },
        {
          title: 'Communities of students',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque... ',
          img: '/images/placeholder.jpg',
        },
        {
          title: 'Communities of students',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque... ',
          img: '/images/placeholder.jpg',
        },
        {
          title: 'Communities of students',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque... ',
          img: '/images/placeholder.jpg',
        },
        {
          title: 'Communities of students',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque... ',
          img: '/images/placeholder.jpg',
        },
        {
          title: 'Communities of students',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium bibendum mauris, mollis arcu et. Pellentesque... ',
          img: '/images/placeholder.jpg',
        },
      ],
    },
  };
};

export default Landing;
