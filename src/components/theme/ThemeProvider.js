import React, {createContext, useState} from 'react';
import {DarkTheme} from '@react-navigation/native';
import {useColorScheme} from 'react-native-appearance';

const lightTheme = {
  dark: false,
  colors: {
    text: 'rgb(28, 28, 30)',
    primary: 'rgb(255, 45, 85)',
    card: 'rgb(230, 230, 230)',
    background: 'rgb(255, 255, 255)',
    border: 'rgb(255, 255, 255)',
    notification: '#3d3c3c',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    text: 'rgb(255, 255, 255)',
    notification: 'rgb(204, 204, 204)',
    card: 'rgb(25, 25, 25)',
  },
};

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
