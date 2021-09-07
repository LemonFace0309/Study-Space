import PropTypes from 'prop-types';

import { useTodoContext, TodoProvider } from './TodoContext';
import { useSpotifyContext, SpotifyProvider } from './SpotifyContext';

export const useRoomContext = () => {
  return {
    ...useTodoContext(),
    ...useSpotifyContext(),
  };
};

export const RoomProvider = ({ children }) => {
  return (
    <TodoProvider>
      <SpotifyProvider>{children}</SpotifyProvider>
    </TodoProvider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
