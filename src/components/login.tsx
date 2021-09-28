/* eslint-disable react-hooks/rules-of-hooks */
import React, {useContext} from 'react';
import {useState} from 'react';
//import {Text, View, StyleSheet} from 'react-native';
import {Text, Center, Flex, Input, Button, useColorMode} from 'native-base';
import {MyContext} from '../providers/AuthProvider';

export default function login({}) {
  const {LogIn, wrongPass, resetStorage} = useContext(MyContext);
  const {colorMode, toggleColorMode} = useColorMode();
  //const [{card, text, background, primary}, colors] = useContext(ThemeContext);
  //const {colors} = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [passw, setPassw] = useState('');
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    // <View style={[styles.container, {backgroundColor: colors?.background}]}>
    //   <Text style={[styles.logo, {color: colors?.primary}]}>Škola-Offline</Text>

    //   {wrongPass ? (
    //     <Text style={styles.onWrongPassword}>Špatné jméno nebo heslo</Text>
    //   ) : null}
    //   <View style={[styles.inputView, {backgroundColor: colors?.card}]}>
    //     <TextInput
    //       textContentType={'username'}
    //       onChangeText={text => setName(text)}
    //       value={name}
    //       style={[styles.inputText, {color: colors?.text}]}
    //       placeholderTextColor={colors?.text}
    //       autoCompleteType={'username'}
    //       placeholder="Name.."
    //     />
    //   </View>

    //   <View style={[styles.inputView, {backgroundColor: colors?.card}]}>
    //     <TextInput
    //       secureTextEntry={true}
    //       textContentType={'password'}
    //       onChangeText={password => setPassw(password)}
    //       value={passw}
    //       style={[styles.inputText, {color: colors?.text}]}
    //       placeholderTextColor={colors?.text}
    //       autoCompleteType={'password'}
    //       placeholder="Password.."
    //     />
    //   </View>

    //   <TouchableOpacity
    //     style={[styles.loginBtn, {backgroundColor: colors?.primary}]}
    //     onPress={() => LogIn(name, passw)}>
    //     <Text style={styles.loginText}>Log In</Text>
    //   </TouchableOpacity>
    // </View>
    <Center
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={colorMode === 'dark' ? 'black' : 'white'}>
      <Text fontWeight="bold" fontSize={50}>
        Škola-Offline
      </Text>
      {wrongPass ? (
        <Text color="red" fontSize={15} marginBottom={5}>
          Špatné jméno nebo heslo
        </Text>
      ) : null}

      <Flex w="100%" p={10} flexDirection="column">
        <Input
          m={5}
          value={name}
          h={50}
          w="100%"
          mx={3}
          placeholder="Jméno"
          onChangeText={text => setName(text)}
        />

        <Input
          value={passw}
          h={50}
          w="100%"
          mx={3}
          type={show ? 'text' : 'password'}
          InputRightElement={
            <Button
              ml={1}
              roundedLeft={0}
              roundedRight="md"
              onPress={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          }
          placeholder="Heslo"
          onChangeText={password => setPassw(password)}
          autoCompleteType={'password'}
          secureTextEntry={true}
        />
      </Flex>

      <Button
        onPress={() => {
          LogIn(name, passw);
        }}>
        Přihlásit se
      </Button>

      <Button
        onPress={() => {
          resetStorage();
        }}>
        test
      </Button>

      <Button
        onPress={() => {
          toggleColorMode();
        }}>
        color
      </Button>
    </Center>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputView: {
//     width: '80%',
//     borderRadius: 25,
//     height: 60,
//     marginBottom: 20,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logo: {
//     fontWeight: 'bold',
//     fontSize: 50,
//     marginBottom: 40,
//   },
//   loginBtn: {
//     width: 100,
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginText: {
//     color: 'white',
//   },
//   inputText: {
//     height: 50,
//   },
//   onWrongPassword: {
//     color: 'red',
//     fontSize: 15,
//     marginBottom: 5,
//   },
// });
