import PropTypes from 'prop-types';

import Meta from './Meta';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
