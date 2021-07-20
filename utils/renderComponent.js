const renderComponent = (Component, props = {}) => {
  if (typeof props !== 'object') {
    props = {};
  }
  return <Component {...props} />;
};

export default renderComponent;
