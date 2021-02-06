/* eslint-disable react-hooks/rules-of-hooks */
import AsyncStorage from '@react-native-community/async-storage';
import React, {useContext} from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {MyContext} from '../AuthProvider';
import {useTheme} from '@react-navigation/native';

export default function login({navigation}) {
  const {colors} = useTheme();
  const {LogIn} = useContext(MyContext);
  const [name, setName] = useState('spac.petr');
  const [passw, setPassw] = useState('n2a4RV33');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>App</Text>

      <View style={[styles.inputView]}>
        <TextInput
          onChangeText={(text) => setName(text)}
          value={name}
          style={styles.inputText}
          placeholder="Name.."
        />
      </View>

      <View style={[styles.inputView]}>
        <TextInput
          onChangeText={(password) => setPassw(password)}
          value={passw}
          style={styles.inputText}
          placeholder="Password.."
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => LogIn(name, passw)}>
        <Text style={styles.loginText} title="Log in">
          Log In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          await AsyncStorage.removeItem('user', (err) => {
            if (err) {
              console.error(err);
            }
          });
        }}>
        <Text style={styles.loginText} title="Clear storage">
          Clear storage
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          await AsyncStorage.getAllKeys((err, test) => {
            if (err) {
              console.error(err);
            } else {
              console.log(test);
            }
          });
        }}>
        <Text style={styles.loginText} title="Clear storage">
          see storage
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#e1e1e2',
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    color: 'black',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  loginBtn: {
    width: 100,
    backgroundColor: '#636266',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
  },
  inputText: {
    height: 50,
    color: 'black',
  },
});
