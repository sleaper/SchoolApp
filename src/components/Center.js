import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from './theme/ThemeProvider';

export default function Center({children}) {
  const {theme} = useContext(ThemeContext);
  console.log(theme);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? 'black' : 'white'},
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
