import { useState, useContext, useEffect } from 'react';
import context from './context';

const useStoreOrView = (isStore, args) => {
  const [_, setState] = useState();
  const storeOrView = isStore ? useContext(context) : useContext(context).view(...args);

  useEffect(() => {
    const listener = () => setState({});
    storeOrView.listen(listener);
    return () => storeOrView.unlisten(listener);
  }, []);

  return storeOrView;
}

export const useView = (...args) => {
  return useStoreOrView(false, args);
}

export const useStore = () => {
  return useStoreOrView(true);
}
