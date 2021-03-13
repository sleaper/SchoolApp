import React, {createContext, useState, useEffect, useMemo} from 'react';
//import {useColorScheme} from 'react-native-appearance';
import {themes} from './Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, useColorScheme} from 'react-native';

const defaultDarkThemeName = 'DefaultDark';
const defaultLightThemeName = 'DefaultLight';

const defaultThemeLight = themes.find((t) => t.name === defaultLightThemeName)
  .colors;

const defaultThemeDark = themes.find((t) => t.name === defaultDarkThemeName)
  .colors;

export const ThemeContext = createContext([defaultThemeLight, () => {}]);

const themeKey = '@skLo/theme-key';

export default function ThemeProvider({children}) {
  const scheme = useColorScheme();
  const [chacked, setChacked] = useState(false);
  const [themePref, setThemePref] = useState({});
  const [colors, setColors] = useState(
    scheme === 'dark' ? defaultThemeDark : defaultThemeLight,
  );

  useEffect(() => {
    AsyncStorage.getItem(themeKey).then((x) => {
      if (x) {
        const themeOfChoice = JSON.parse(x);
        setThemePref(x);
        const name =
          themeOfChoice[scheme] ||
          (scheme === 'dark' ? defaultThemeDark : defaultThemeLight);
        console.log(name);
        const c = themes.find((t) => t.name === name).colors;
        if (c) {
          setColors(c);
        }
      }
    });
  }, [scheme]);

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => [
          colors,
          (name) => {
            const c = themes.find((t) => t.name === name).colors;
            if (c) {
              setColors(c);
              const newThemePref = {
                ...themePref,
                [scheme]: name,
              };
              setThemePref(newThemePref);
              AsyncStorage.setItem(themeKey, JSON.stringify(newThemePref));
            }
          },
        ],
        [colors, scheme, themePref],
      )}>
      <StatusBar
        barStyle={
          colors.editorBackground === '#002B36'
            ? 'light-content'
            : scheme === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
      />
      {children}
    </ThemeContext.Provider>
  );
}
//{theme, toggleTheme}
