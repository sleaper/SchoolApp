import React, {Dispatch, SetStateAction, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Flex, Pressable, Text, useColorModeValue} from 'native-base';
import {CalendarDayTypes} from '../../util/types';

function Event({item}: {item: CalendarDayTypes}) {
  return (
    <Flex
      mt={4}
      alignItems="center"
      flexDirection="row"
      backgroundColor={`rgb(${item.events?.color})`}
      borderRadius="20px"
      pl={3}
      pr={3}>
      <Icon name={'book'} size={15} color={'black'} />
      <Text pl={1}>{item.events?.event}</Text>
    </Flex>
  );
}

interface Props {
  item: CalendarDayTypes;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setModalTitle: Dispatch<SetStateAction<string>>;
  setModalData: Dispatch<SetStateAction<string>>;
}

export default function DayItem({
  item,
  setModalVisible,
  setModalTitle,
  setModalData,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [active, setActive] = useState<boolean>(item.notes ? true : false);

  return (
    <Pressable
      _pressed={{backgroundColor: useColorModeValue('light.200', 'muted.700')}}
      disabled={!active}
      onPress={() => {
        setModalVisible(true);
        setModalTitle('Poznámka');
        setModalData(item.notes?.note as string);
      }}
      backgroundColor={useColorModeValue('white', 'muted.800')}
      w="90%"
      m={5}
      mb={0.5}
      pl={5}
      p={4}
      pt={2}
      flexDirection="row"
      justifyContent="space-between"
      borderRadius={'20'}
      shadow="5">
      <Flex flexDirection="row">
        <Text fontSize="22px" pt="4">
          {item.order}
        </Text>

        <Flex pt={2} pl={4}>
          <Text fontWeight="bold" fontSize="18px">
            {item.name}
          </Text>
          <Text fontSize="15px">{item.teacher}</Text>
          {item.events && <Event item={item} />}
          {active && (
            <Icon name={'information-circle'} size={20} color={'#2A64FF'} />
          )}
        </Flex>
      </Flex>
      <Flex justifyContent="space-around" alignItems="flex-end" flexWrap="wrap">
        <Text pr={2}>{item.timeFrom + ' - ' + item.timeTo}</Text>
        <Text pr={2}>{item.class}</Text>
      </Flex>
    </Pressable>
  );
}
