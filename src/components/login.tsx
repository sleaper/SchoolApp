/* eslint-disable react-hooks/rules-of-hooks */
import React, {useContext} from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {MyContext} from '../AuthProvider';
import {ThemeContext} from './theme/ThemeProvider';

export default function login({navigation}) {
  const {LogIn, wrongPass} = useContext(MyContext);
  const [{card, text, background, primary}] = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [passw, setPassw] = useState('');

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <Text style={[styles.logo, {color: primary}]}>Škola-Offline</Text>

      {wrongPass ? (
        <Text style={styles.onWrongPassword}>Špatné jméno nebo heslo</Text>
      ) : null}
      <View style={[styles.inputView, {backgroundColor: card}]}>
        <TextInput
          textContentType={'username'}
          onChangeText={text => setName(text)}
          value={name}
          style={[styles.inputText, {color: text}]}
          placeholderTextColor={text}
          autoCompleteType={'username'}
          placeholder="Name.."
        />
      </View>

      <View style={[styles.inputView, {backgroundColor: card}]}>
        <TextInput
          secureTextEntry={true}
          textContentType={'password'}
          onChangeText={password => setPassw(password)}
          value={passw}
          style={[styles.inputText, {color: text}]}
          placeholderTextColor={text}
          autoCompleteType={'password'}
          placeholder="Password.."
        />
      </View>

      <TouchableOpacity
        style={[styles.loginBtn, {backgroundColor: primary}]}
        onPress={() => LogIn(name, passw)}>
        <Text style={styles.loginText}>Log In</Text>
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
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
  },
  loginBtn: {
    width: 100,
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
  },
  onWrongPassword: {
    color: 'red',
    fontSize: 15,
    marginBottom: 5,
  },
});
