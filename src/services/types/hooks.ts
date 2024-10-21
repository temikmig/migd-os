import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import { AppDispatch, RootState } from '../types';
import { useState, useEffect, useRef } from 'react';
  
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch>(); 

export function useInsideAlerter(onOutsideClick:any) {
    const ref:any = useRef();
  
    useEffect(() => {
      function handleClick(event:any) {
        if (ref.current && ref.current.contains(event.target)) {
          onOutsideClick();
        }
      }
      
      document.addEventListener('mousedown', handleClick);
      
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }, [onOutsideClick]);
  
    return ref;
}

export function useOutsideAlerter(onOutsideClick:any) {
    const ref:any = useRef();
  
    useEffect(() => {
      function handleClick(event:any) {
        if (ref.current && !ref.current.contains(event.target)) {
          onOutsideClick();
        }
      }
      
      document.addEventListener('mousedown', handleClick);
      
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }, [onOutsideClick]);
  
    return ref;
}

export const useOutsideClick = (initialValue:boolean) => {
  const [isActive, setIsActive] = useState(initialValue);
  const ref:any = useRef(null);

  const handleClick = (e:any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return { ref, isActive, setIsActive };
};