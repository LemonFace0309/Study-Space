import PropTypes from 'prop-types';

import Header from '../../components/Landing/Header';
import Hero from '../../components/Landing/Hero';
import LandingSpaces from '../../components/Landing/LandingSpaces';
import Feature, { DIRECTIONS } from '../../components/Landing/Feature';

const Landing = ({ data, features }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
      </div>
      <LandingSpaces data={data} />
      {features.map((feature, index) => (
        <Feature
          key={index}
          title={feature.title}
          body={feature.body}
          img={feature.img}
          direction={index % 2 ? DIRECTIONS.BACKWARDS : DIRECTIONS.FORWARDS}
        />
      ))}
    </>
  );
};

Landing.propTypes = {
  data: PropTypes.array.isRequired,
  features: PropTypes.array.isRequired,
};

export const getStaticProps = async () => {
  return {
    props: {
      data: [
        {
          spaceName: 'UW Math 2025',
          description:
            'finals grind, upper years available in chat for help with past exams',
          headCount: '17',
          music: 'lofi 2',
        },
        {
          spaceName: "Capstone Grind '25",
          description:
            'writing your report, making your presentation, setting up data',
          headCount: '23',
          music: 'cafe beats eng edition F21',
        },
        {
          spaceName: 'UW Math 2025',
          description:
            '3rd and 4th years offering help in MSCI, GENE, MATH, and CS',
          headCount: '8',
          music: 'none',
        },
      ],
      features: [
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
    },
  };
};

export default Landing;
