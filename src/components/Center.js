import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from './theme/ThemeProvider';

export default function Center({children}) {
  //const [{background}] = useContext(ThemeContext);
  //style={[styles.container, {backgroundColor: background}]}
  return <View>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
