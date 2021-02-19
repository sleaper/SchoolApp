import React, {createContext, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

export const ThemeContext = createContext({});

export default function ThemeProvider({children}) {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme);

  // For tooggling the Theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
