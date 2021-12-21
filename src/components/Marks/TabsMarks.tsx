import React, {useContext, useState} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getLastWeek, getLastMonth} from '../../util/utilz';
import {useMarksByDateQuery} from './TabsMarks.codegen';
import {
  Box,
  Button,
  FlatList,
  Flex,
  Modal,
  Pressable,
  Text,
  useColorModeValue,
} from 'native-base';
import {ActivityIndicator} from 'react-native';
import MyCenter from '../MyCenter';

export default function TabsMarks({upperNavig}) {
  const iconColor = useColorModeValue('black', 'white');
  const itemBg = useColorModeValue('white', 'muted.800');
  //const bgColor = useColorModeValue('white', 'muted.800');

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
      <MyCenter>
        <ActivityIndicator size="large" color="#0000ff" />
      </MyCenter>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItemMark = ({item}) => {
    return (
      <Flex
        height="auto"
        p={3}
        w="90%"
        m={'auto'}
        mb={2}
        mt={5}
        borderRadius={'2xl'}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        shadow={5}
        backgroundColor={itemBg}>
        <Box pl={3}>
          <Text fontSize={17} fontWeight={'bold'}>
            {item.subject.ZKRATKA} - {item.name}
          </Text>
          <Text mt={0.5} fontSize={14}>
            {item.value.NAZEV}
          </Text>
          <Text mt={0.5} fontSize={14}>
            {item.date}
          </Text>
        </Box>

        <Text fontSize={20} fontWeight={'bold'} mr={5}>
          {item.mark ? item.mark : '-'}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex>
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
                let tmpDate = getLastWeek();
                refetch({
                  dateFrom: tmpDate[0],
                  dateTo: tmpDate[1],
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
                let tmpDate = getLastMonth();
                refetch({
                  dateFrom: tmpDate[0],
                  dateTo: tmpDate[1],
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
    </Flex>
  );
}
