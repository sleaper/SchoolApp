import {DarkTheme} from '@react-navigation/native';

export const lightTheme = {
  dark: false,
  colors: {
    text: 'rgb(28, 28, 30)',
    primary: 'rgb(255, 45, 85)',
    card: 'rgb(238, 238, 238)',
    background: 'rgb(255, 255, 255)',
    border: 'rgb(255, 255, 255)',
    notification: '#3d3c3c',
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    text: 'rgb(255, 255, 255)',
    notification: 'rgb(204, 204, 204)',
    border: 'rgb(255, 255, 255)',
  },
};
