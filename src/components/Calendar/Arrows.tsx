import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Flex, Text, Pressable} from 'native-base';

export default function Arrows({leftArr, rightArr, date}) {
  return (
    <Flex
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center">
      <Pressable
        onPress={() => {
          leftArr();
        }}>
        <Icon name="arrow-back-outline" size={30} color="blue" />
      </Pressable>
      <Text fontSize="20px" fontWeight="bold">
        {date[2] + '. ' + date[1] + '. ' + date[0]}
      </Text>
      <Pressable
        onPress={() => {
          rightArr();
        }}>
        <Icon name="arrow-forward-outline" size={30} color="blue" />
      </Pressable>
    </Flex>
  );
}
