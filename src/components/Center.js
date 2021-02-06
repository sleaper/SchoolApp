import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function Center({children}) {
  const {colors} = useTheme();
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
