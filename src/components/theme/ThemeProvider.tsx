import React, {createContext, useState, useEffect} from 'react';
//import {useColorScheme} from 'react-native-appearance';
import {Colors, Theme, themes} from './Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ColorSchemeName, StatusBar, useColorScheme} from 'react-native';

const defaultDarkThemeName = 'DefaultDark';
const defaultLightThemeName = 'DefaultLight';

const defaultThemeLight = themes.find(t => t.name === defaultLightThemeName)
  ?.colors;

const defaultThemeDark = themes.find(t => t.name === defaultDarkThemeName)
  ?.colors;

export const ThemeContext = createContext<{
  colors: Colors | undefined;
  name: (name: string) => void;
}>({} as any);

const themeKey = '@skLo/theme-key';

export default function ThemeProvider({children}) {
  const scheme: ColorSchemeName = useColorScheme();
  const [themePref, setThemePref] = useState<Theme | {}>({});
  const [colors, setColors] = useState(
    scheme === 'dark' ? defaultThemeDark : defaultThemeLight,
  );

  useEffect(() => {
    AsyncStorage.getItem(themeKey).then(x => {
      if (x) {
        const themeOfChoice: Theme = JSON.parse(x);
        setThemePref(x);
        const name =
          themeOfChoice[scheme as string] ||
          (scheme === 'dark' ? defaultThemeDark : defaultThemeLight);

        const c = themes.find(t => t.name === name)?.colors;
        if (c) {
          setColors(c);
        }
      }
    });
  }, [scheme]);

  return (
    <ThemeContext.Provider
      value={{
        colors,
        name: (name: string) => {
          const c = themes.find(t => t.name === name)?.colors;
          if (c) {
            setColors(c);
            const newThemePref = {
              ...themePref,
              [scheme as string]: name,
            };
            setThemePref(newThemePref);
            AsyncStorage.setItem(themeKey, JSON.stringify(newThemePref));
          }
        },
      }}>
      {children}
    </ThemeContext.Provider>
  );
}
//{theme, toggleTheme}
