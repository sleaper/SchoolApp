import {useColorMode} from 'native-base';

export const useHeaderOptions = () => {
  const {colorMode} = useColorMode();

  return {
    headerStyle: {
      backgroundColor: colorMode === 'dark' ? 'rgb(30, 30, 30)' : 'white',
    },
    headerTitleStyle: {
      color: colorMode === 'dark' ? 'rgb(30, 30, 30)' : 'white',
    },
  };
};
