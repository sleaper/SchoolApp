import {useColorMode} from 'native-base';

export const useHeaderOptions = () => {
  const {colorMode} = useColorMode();

  return {
    headerStyle: {
      backgroundColor: colorMode === 'dark' ? 'rgb(30, 30, 30)' : 'white',
    },
    //headerTintColor: text,
    headerTitleStyle: {
      color: colorMode === 'dark' ? 'rgb(30, 30, 30)' : 'white',
    },
  };
};
