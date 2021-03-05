import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from './theme/ThemeProvider';

export default function Center({children}) {
  const [{background}] = useContext(ThemeContext);

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
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
