exports.shouldUpdateScroll = ({routerProps: {location}}) => {
  if (location.pathname === '/about/') return true;

  window.scrollTo(0, 0);
  return false;
};
