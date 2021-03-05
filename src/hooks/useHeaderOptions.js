import {useContext} from 'react';
import {ThemeContext} from '../components/theme/ThemeProvider';

export const useHeaderOptions = () => {
  const [{text, card}] = useContext(ThemeContext);

  return {
    headerStyle: {backgroundColor: card},
    //headerTintColor: text,
    headerTitleStyle: {
      color: text,
    },
  };
};
