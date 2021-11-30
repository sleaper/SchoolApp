import React from 'react';
import {FlatList} from 'react-native';
import Emoji from 'react-native-emoji';
import {Flex, Text} from 'native-base';
import {dayInfo} from '../../util/types';
import {useColorModeValue} from 'native-base';

export default function DaySchedule({data}: {data: any}) {
  //useColorModeValue('white', 'muted.800')
  const itemBg = useColorModeValue('white', 'muted.800');
  const renderItem = ({item}: {item: dayInfo}) => {
    return (
      <Flex
        backgroundColor={itemBg}
        h={135}
        w={130}
        ml={5}
        borderRadius={20}
        p={2}
        mt={4}
        shadow={5}>
        <Text textAlign="center">
          {
            //@ts-expect-error
            item.timeFrom.substring(11, 16) +
              ' - ' +
              //@ts-expect-error
              item.timeTo.substring(11, 16)
          }
        </Text>
        <Flex flexDirection="column" alignItems="center" mt={2}>
          <Text fontWeight="bold">{item.name.substring(0, 3)}</Text>
          <Text fontSize={15}>{item.teacher}</Text>
          <Text fontSize={15}>{item.room}</Text>
        </Flex>
      </Flex>
    );
  };

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
        <Text paddingLeft={10} paddingTop={6} fontSize={22} fontWeight="bold">
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
