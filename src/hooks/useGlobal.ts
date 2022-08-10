import { useContext } from 'react';

import { GlobalContext, globalContext } from '../context/global';

export default function useGlobal(): GlobalContext {
  const global = useContext(globalContext);
  return global;
}
