import { createContext } from 'react';

export interface GlobalContext {
  isDarkMode: boolean;
}

export const globalContext = createContext<GlobalContext>({ isDarkMode: false });
