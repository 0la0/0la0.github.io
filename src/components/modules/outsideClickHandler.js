import { useRef, useEffect } from 'react';

const handleOutsideClick = callback => {
  const callbackRef = useRef();
  const innerRef = useRef();

  const handleClick = event => {
    const hasRefAndCallback = innerRef.current && callbackRef.current;
    const clickIsInsideComponent = innerRef.current?.contains(event.target);
    if (hasRefAndCallback && !clickIsInsideComponent) {
      callbackRef.current(event);
    }
  };

  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return innerRef;
}

export default handleOutsideClick;
