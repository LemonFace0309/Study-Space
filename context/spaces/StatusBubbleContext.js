import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import useStateRef from '@/hooks/useStateRef';
import STATUS_ENUM from './libs/statusBubbleEnum';

const StatusBubbleContext = createContext();

export const useStatusBubbleContext = () => {
  return useContext(StatusBubbleContext);
};

export const StatusBubbleProvider = ({ children }) => {
  const [statusBubble, setStatusBubble, statusBubbleRef] = useStateRef(STATUS_ENUM.FOCUSED);

  const setStatusFocused = () => {
    setStatusBubble(STATUS_ENUM.FOCUSED);
  };

  const setStatusBreak = () => {
    setStatusBubble(STATUS_ENUM.BREAK);
  };

  const timeoutRevertToFocused = useMemo(() => {
    return debounce(() => setStatusBubble(STATUS_ENUM.FOCUSED), 30000);
  }, []);

  const setStatusActiveTemp = () => {
    setStatusBubble(STATUS_ENUM.ACTIVE);
    timeoutRevertToFocused();
  };

  const setStatusActivePerm = () => {
    setStatusBubble(STATUS_ENUM.ACTIVE);
    timeoutRevertToFocused();
  };

  const value = {
    statusBubble,
    statusBubbleRef,
    setStatusFocused,
    setStatusBreak,
    setStatusActiveTemp,
    setStatusActivePerm,
  };

  return <StatusBubbleContext.Provider value={value}>{children}</StatusBubbleContext.Provider>;
};

StatusBubbleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
