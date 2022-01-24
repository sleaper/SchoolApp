import React, {useContext} from 'react';
import {useState} from 'react';
import {
  Text,
  Center,
  Flex,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  Pressable,
} from 'native-base';
import {MyContext} from '../providers/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons';

export function Login() {
  const {LogIn, wrongPass} = useContext(MyContext);
  const {colorMode} = useColorMode();
  const [name, setName] = useState('spac.petr');
  const [passw, setPassw] = useState('n2a4RV33');
  const [show, setShow] = useState(false);
  const iconColor = useColorModeValue('black', 'white');
  const handleClick = () => setShow(!show);

  return (
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
            <Pressable onPress={() => handleClick()} pr={2}>
              <Icon
                name={show ? 'eye-outline' : 'eye-off-outline'}
                size={25}
                color={iconColor}
              />
            </Pressable>
          }
          placeholder="Heslo"
          onChangeText={password => setPassw(password)}
          autoCompleteType={'password'}
          secureTextEntry={show ? false : true}
        />
      </Flex>

      <Button
        onPress={() => {
          LogIn(name, passw);
        }}>
        Přihlásit se
      </Button>
    </Center>
  );
}
