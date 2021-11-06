import React from 'react';
import {FlatList} from 'react-native';
import Emoji from 'react-native-emoji';
import {Flex, Text} from 'native-base';
import {dayInfo} from '../../util/types';

export default function DaySchedule({data}: {data: [dayInfo] | undefined}) {
  const renderItem = ({item}: {item: dayInfo}) => {
    return (
      <Flex
        backgroundColor={item.color}
        h={135}
        w={130}
        ml={5}
        mt={5}
        borderRadius={20}>
        <Text textAlign="center">
          {
            //@ts-expect-error
            item.timeFrom.substring(11, 16)
          }
        </Text>
        <Flex flex={6} pt={2.5} flexDirection="column" alignItems="center">
          <Text fontWeight="bold">{item.name.substring(0, 3)}</Text>
          <Text marginTop={2.5} fontSize={15}>
            {item.teacher}
          </Text>
          <Text fontSize={15}>{item.room}</Text>
        </Flex>
      </Flex>
    );
  };
  //@ts-expect-error
  if (!data[0]) {
    return (
      <Flex alignItems="center">
        <Emoji name=":man-shrugging:" style={{fontSize: 50}} />
        <Text>Dnes máš volno!</Text>
      </Flex>
    );
  } else {
    return (
      <>
        <Text paddingLeft={10} paddingTop={10} fontSize={22} fontWeight="bold">
          Dnešní hodiny
        </Text>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          initialNumToRender={4}
        />
      </>
    );
  }
}
