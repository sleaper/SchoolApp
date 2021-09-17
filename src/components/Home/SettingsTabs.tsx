import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Flex, useColorMode, Button, Text} from 'native-base';

export default function SettingsTabs({name}) {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Flex
      alignItems="center"
      backgroundColor={colorMode === 'dark' ? 'black' : 'white'}
      h="100%">
      <Icon
        name="person-circle-outline"
        size={70}
        color={colorMode === 'dark' ? 'white' : 'black'}
      />
      <Text fontSize={25}>{name}</Text>
      <Button onPress={toggleColorMode}>Toggle</Button>
    </Flex>
  );
}
