import { RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void,
): void => {
  const handleClick = (event: AnyEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler(event);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
