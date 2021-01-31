import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

export default function AddButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'blue',
    marginRight: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});
