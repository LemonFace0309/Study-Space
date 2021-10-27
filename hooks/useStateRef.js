import { useCallback, useRef, useState } from 'react';

const useStateRef = (initialValue) => {
  const [state, setState] = useState(() => {
    if (typeof initialValue === 'function') {
      initialValue();
    }
    return initialValue;
  });
  const ref = useRef(state);

  const dispatch = useCallback((setStateAction) => {
    ref.current = typeof setStateAction == 'function' ? setStateAction(ref.current) : setStateAction;

    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
};

export default useStateRef;
