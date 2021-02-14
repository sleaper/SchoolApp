import React, {createContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {useColorScheme} from 'react-native-appearance';

export const ThemeContext = createContext({});

export default function ThemeProvider({children}) {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState('light');

  // For tooggling the Theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  /*useEffect(() => {
    if (scheme === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [scheme]);*/

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
