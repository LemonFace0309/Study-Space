import PropTypes from 'prop-types';
import Head from 'next/head';

const Meta = ({ title, keywords, description, image }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image}></meta>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <title>{title}</title>
    </Head>
  );
};

Meta.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Meta.defaultProps = {
  title: 'Startup',
  keywords: 'cool startup',
  description: '',
  image: '',
};

export default Meta;
