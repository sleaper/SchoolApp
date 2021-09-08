export interface Theme {
  name: string;
  colors: {
    text: string;
    primary: string;
    card: string;
    background: string;
    border: string;
    notification: string;
  };
}

export interface Colors {
  text: string;
  primary: string;
  card: string;
  background: string;
  border: string;
  notification: string;
}

export const themes = [
  {
    name: 'DefaultLight',
    colors: {
      text: 'rgb(28, 28, 30)',
      primary: 'rgb(0, 141, 255)',
      card: 'rgb(230, 230, 230)',
      background: 'rgb(255, 255, 255)',
      border: 'rgb(255, 255, 255)',
      notification: '#3d3c3c',
    },
  },
  {
    name: 'DefaultDark',
    colors: {
      text: 'rgb(255, 255, 255)',
      primary: 'rgb(0, 141, 255)',
      card: 'rgb(30, 30, 30)',
      background: 'rgb(0, 0, 0)',
      border: 'rgb(255, 255, 255)',
      notification: 'rgb(204, 204, 204)',
    },
  },
];

// {
//   name: 'Red',
//   colors: {
//     text: '#fff',
//     primary: 'rgb(255, 45, 85)',
//     card: '#833',
//     background: '#390000',
//     border: 'rgb(255, 255, 255)',
//     notification: '#fff',
//   },
// },
// {
//   name: 'Abyss',
//   colors: {
//     text: '#fff',
//     primary: 'rgb(255, 45, 85)',
//     card: '#2B3C5D',
//     background: '#000c18',
//     border: 'rgb(255, 255, 255)',
//     notification: '#fff',
//   },
// },

export const vscodeThemes = [
  {
    name: 'Red',
    colors: {
      editorBackground: '#390000',
      editorForeground: '#F8F8F8',
      buttonBackground: '#833',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#580000',
      inputOptionActiveBorder: '#cc0000',
      inputValidationErrorBorder: '#BE1100',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Abyss',
    colors: {
      editorBackground: '#000c18',
      editorForeground: '#6688cc',
      buttonBackground: '#2B3C5D',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#181f2f',
      inputOptionActiveBorder: '#1D4A87',
      inputValidationErrorBorder: '#AB395B',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Default Dark',
    colors: {
      editorBackground: '#1E1E1E',
      editorForeground: '#D4D4D4',
      buttonBackground: '#0E639C',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#3C3C3C',
      inputOptionActiveBorder: '#007ACC00',
      inputValidationErrorBorder: '#BE1100',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Dimmed Monokai',
    colors: {
      editorBackground: '#1e1e1e',
      editorForeground: '#c5c8c6',
      buttonBackground: '#565656',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#3C3C3C',
      inputOptionActiveBorder: '#3655b5',
      inputValidationErrorBorder: '#BE1100',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Kimbie Dark',
    colors: {
      editorBackground: '#221a0f',
      editorForeground: '#d3af86',
      buttonBackground: '#6e583b',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#51412c',
      inputOptionActiveBorder: '#a57a4c',
      inputValidationErrorBorder: '#9d2f23',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Default Light',
    colors: {
      editorBackground: '#FFFFFF',
      editorForeground: '#000000',
      buttonBackground: '#0E639C',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#3C3C3C',
      inputOptionActiveBorder: '#007ACC00',
      inputValidationErrorBorder: '#BE1100',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Monokai',
    colors: {
      editorBackground: '#272822',
      editorForeground: '#f8f8f2',
      buttonBackground: '#75715E',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#414339',
      inputOptionActiveBorder: '#75715E',
      inputValidationErrorBorder: '#f92672',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Quiet Light',
    colors: {
      editorBackground: '#F5F5F5',
      editorForeground: '#BBBBBB',
      buttonBackground: '#705697',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#3C3C3C',
      inputOptionActiveBorder: '#adafb7',
      inputValidationErrorBorder: '#f1897f',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Solarized (dark)',
    colors: {
      editorBackground: '#002B36',
      editorForeground: '#BBBBBB',
      buttonBackground: '#2AA19899',
      buttonForeground: '#fff',
      inputForeground: '#93A1A1',
      inputBackground: '#003847',
      inputOptionActiveBorder: '#2AA19899',
      inputValidationErrorBorder: '#a92049',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Solarized (light)',
    colors: {
      editorBackground: '#FDF6E3',
      editorForeground: '#BBBBBB',
      buttonBackground: '#AC9D57',
      buttonForeground: '#fff',
      inputForeground: '#586E75',
      inputBackground: '#DDD6C1',
      inputOptionActiveBorder: '#D3AF86',
      inputValidationErrorBorder: '#BE1100',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
  {
    name: 'Tomorrow Night Blue',
    colors: {
      editorBackground: '#002451',
      editorForeground: '#ffffff',
      buttonBackground: '#0E639C',
      buttonForeground: '#fff',
      inputForeground: '#CCCCCC',
      inputBackground: '#001733',
      inputOptionActiveBorder: '#007ACC00',
      inputValidationErrorBorder: '#BE1100',
      buttonSecondaryForeground: '#fff',
      buttonSecondaryBackground: '#3A3D41',
    },
  },
];
