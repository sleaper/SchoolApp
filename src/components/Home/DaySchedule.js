import React from 'react';
import {FlatList} from 'react-native';
import Emoji from 'react-native-emoji';
import {Flex, Text} from 'native-base';

export default function DaySchedule({data}) {
  const renderItem = ({item}) => {
    return (
      <Flex flex={0.5}>
        <Text textAlign="center">{item.TimeFrom.substring(11, 16)}</Text>
        <Flex
          height={130}
          width={120}
          marginLeft={10}
          marginTop={10}
          borderRadius={20}>
          <Text fontSize={16} fontWeight="bold">
            {item.Name.substring(0, 3)}
          </Text>
          <Text marginTop={2.5} fontSize={14}>
            {item.Teacher}
          </Text>
          <Text marginTop={2.5} fontSize={14}>
            {item.Room}
          </Text>
        </Flex>
      </Flex>
    );
  };
  if (data[0] == null) {
    return (
      <Flex alignItems="center">
        <Emoji name=":man-shrugging:" style={{fontSize: 50}} />
      </Flex>
    );
  } else {
    return (
      <Flex>
        <Text paddingLeft={20} paddingTop={10} fontSize={20} fontWeight="bold">
          Dnes
        </Text>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.SubjectId}
          initialNumToRender={4}
        />
      </Flex>
    );
  }
}
