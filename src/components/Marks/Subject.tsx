/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import {ActivityIndicator} from 'react-native';
import {
  Text,
  Flex,
  useColorMode,
  Box,
  FlatList,
  useColorModeValue,
  Divider,
} from 'native-base';
import {useSubjectMarksQuery} from './Subject.codegen';
import MyCenter from '../MyCenter';

export default function Subject({route}) {
  const {info} = useContext(MyContext);
  const {name, shortName} = route.params;
  const itemBg = useColorModeValue('#ffffff', 'muted.800');

  const {data, loading, error} = useSubjectMarksQuery({
    variables: {subject: name, key: info?.key as string},
  });

  if (loading) {
    return (
      <MyCenter>
        <ActivityIndicator size="large" color="#0000ff" />
      </MyCenter>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItem = ({item}) => {
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
        shadow={3}
        backgroundColor={itemBg}>
        <Box p={3}>
          <Text fontSize={20} fontWeight={'bold'}>
            {item.name}
          </Text>
          <Text mt={0.5} fontSize={17}>
            {item.value.NAZEV}
          </Text>
          <Text mt={0.5} fontSize={17}>
            {new Date(item.date)
              .toISOString()
              .replace(/T.*/, '')
              .split('-')
              .reverse()
              .join('.')}
          </Text>
        </Box>

        <Text fontSize={25} fontWeight={'bold'} mr={5}>
          {item.mark ? item.mark : '-'}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex h="100%">
      <Box
        justifyContent="center"
        //backgroundColor={itemBg === 'light' ? '#f5f5f5' : '#2f2f2f'}
      >
        <Text fontSize={25} fontWeight={'bold'} pl={25}>
          {name}:
        </Text>
        <Text fontSize={14} pl={25}>
          Počet známek: {data?.user.subjectMarks.length}
        </Text>
        <Divider my={2} />
      </Box>
      <FlatList
        data={data?.user.subjectMarks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        initialNumToRender={5}
      />
    </Flex>
  );
}
