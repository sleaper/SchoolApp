import React from 'react';
import {FlatList} from 'react-native';
import Emoji from 'react-native-emoji';
import {Flex, Text} from 'native-base';
import {dayInfo} from '../../types';

export default function DaySchedule({data}: {data: [dayInfo]}) {
  const renderItem = ({item}: {item: dayInfo}) => {
    return (
      <Flex
        backgroundColor={item.color}
        h={130}
        w={120}
        ml={5}
        mt={5}
        borderRadius={20}>
        <Text textAlign="center">{item.timeFrom.substring(11, 16)}</Text>
        <Flex flex={6} pt={2.5} flexDirection="column" alignItems="center">
          <Text fontWeight="bold">{item.name.substring(0, 3)}</Text>
          <Text marginTop={2.5} fontSize={14}>
            {item.teacher}
          </Text>
          <Text fontSize={14}>{item.room}</Text>
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
        <Text paddingLeft={10} paddingTop={10} fontSize={20} fontWeight="bold">
          Dnešní hodiny
        </Text>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          initialNumToRender={4}
        />
      </Flex>
    );
  }
}
