const renderComponent = (Component, props = {}, child = null) => {
  if (typeof props !== 'object') {
    props = {};
  }
  return <Component {...props}>{child && renderComponent(child)}</Component>;
};

export default renderComponent;
