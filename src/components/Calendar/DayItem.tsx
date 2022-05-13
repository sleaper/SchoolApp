import React, {Dispatch, SetStateAction, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Flex,
  HStack,
  Pressable,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base';
import {CalendarDayTypes} from '../../util/types';
import {pickColor} from '../../util/pickColor';

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
      backgroundColor={useColorModeValue(
        pickColor(item.color) ? 'light.200' : 'red.200',
        pickColor(item.color) ? 'muted.800' : 'red.800',
      )}
      borderRadius={'20'}
      m={2}
      shadow="5">
      <HStack flexDirection="row" justifyContent="space-between" m={3}>
        <HStack space={2} alignItems="center">
          <Text p={2} fontSize="22px">
            {item.order}
          </Text>
          <VStack>
            <Text fontWeight="bold" fontSize="18px">
              {item.name}
            </Text>
            <Text fontSize="15px">{item.teacher}</Text>
            {item.events && <Event item={item} />}
            {active && (
              <Icon name={'information-circle'} size={20} color={'#2A64FF'} />
            )}
          </VStack>
        </HStack>

        <Flex
          justifyContent="space-around"
          alignItems="flex-end"
          flexWrap="wrap">
          <Text pr={2}>{item.timeFrom + ' - ' + item.timeTo}</Text>
          <Text pr={2}>{item.class}</Text>
        </Flex>
      </HStack>
    </Pressable>
  );
}
