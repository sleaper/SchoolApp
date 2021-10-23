import React, {useContext, useState} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import Center from '../Center';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getLastWeek, getLastMonth} from '../../util/utilz';
import {useMarksByDateQuery} from './TabsMarks.codegen';
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  Text,
  useColorModeValue,
  View,
} from 'native-base';
import {ActivityIndicator} from 'react-native';

export default function TabsMarks({upperNavig}) {
  const iconColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('white', 'black');
  const itemBgColor = useColorModeValue('#d1d1d1', '#262626');
  const isFocused = useIsFocused();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {info} = useContext(MyContext);
  const [date, setDate] = useState(getLastWeek());

  const {data, loading, error, refetch} = useMarksByDateQuery({
    variables: {
      key: info?.key as string, // value for 'key'
      dateFrom: date[0], // value for 'dateFrom'
      dateTo: date[1], // value for 'dateTo'
    },
  });

  React.useLayoutEffect(() => {
    if (isFocused) {
      upperNavig.setOptions({
        headerLeft: () => (
          <Pressable onPress={() => setIsModalOpen(true)} ml="5">
            <Icon name={'cog-outline'} size={35} color={iconColor} />
          </Pressable>
        ),
      });
    } else {
      upperNavig.setOptions({
        headerLeft: () => null,
      });
    }
  }, [upperNavig, iconColor, isFocused]);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItemMark = ({item}) => {
    return (
      <View
        backgroundColor={itemBgColor}
        h={115}
        w={'90%'}
        m="3"
        borderRadius={20}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <View>
          <Text pl={10} fontSize={17} fontWeight={'bold'}>
            {item.subject.ZKRATKA} - {item.name}
          </Text>
          <Text mt={0.5} pl={10} fontSize={14}>
            {item.value.NAZEV}
          </Text>
          <Text mt={0.5} pl={10} fontSize={14}>
            {item.date}
          </Text>
        </View>
        <View pt={5} fontSize={20} fontWeight={'bold'} mr={10}>
          <Text fontSize={17}>{item.mark ? item.mark : '-'}</Text>
        </View>
      </View>
    );
  };

  return (
    <View flex={1} backgroundColor={bgColor}>
      <Modal
        size={'sm'}
        animationPreset="slide"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontSize={25}>Změna období</Text>
          </Modal.Header>
          <Modal.Body>
            <Button
              backgroundColor={'lightBlue.600'}
              onPress={() => {
                setDate(getLastWeek());
                refetch({
                  dateFrom: date[0],
                  dateTo: date[1],
                  key: info?.key as string,
                });
                setIsModalOpen(!isModalOpen);
              }}>
              <Text fontSize={17}>Poslední týden</Text>
            </Button>
            <Button
              mt={2}
              backgroundColor={'lightBlue.600'}
              onPress={() => {
                setDate(getLastMonth());
                refetch({
                  dateFrom: date[0],
                  dateTo: date[1],
                  key: info?.key as string,
                });
                setIsModalOpen(!isModalOpen);
              }}>
              <Text fontSize={17}>Poslední měsíc</Text>
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <FlatList
        data={data?.user.marks}
        renderItem={renderItemMark}
        initialNumToRender={7}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
