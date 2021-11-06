import React, {useContext} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import {ActivityIndicator} from 'react-native';
import {Text, Flex, useColorMode, Box, FlatList, Center} from 'native-base';
import {useSubjectMarksQuery} from './Subject.codegen';

export default function Subject({route}) {
  const {info} = useContext(MyContext);
  const {name} = route.params;

  const {data, loading, error} = useSubjectMarksQuery({
    variables: {subject: name, key: info?.key as string},
  });
  const {colorMode} = useColorMode();

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
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
        mt={8}
        borderRadius={'2xl'}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor={colorMode === 'light' ? '#f5f5f5' : '#2f2f2f'}>
        <Flex pl={5}>
          <Text fontSize={17} fontWeight="bold">
            {item.name}
          </Text>
          <Text mt={2.5} fontSize={14}>
            {item.value.NAZEV}
          </Text>
          <Text mt={2.5} fontSize={14}>
            {item.date}
          </Text>
        </Flex>

        <Text pt={5} mr={5} fontSize={20} fontWeight="bold">
          {item.mark ? item.mark : '-'}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex backgroundColor={colorMode === 'light' ? 'white' : 'black'} h="100%">
      <Box
        h="80px"
        borderBottomLeftRadius={35}
        borderBottomRightRadius={35}
        mb={15}
        justifyContent="center"
        backgroundColor={colorMode === 'light' ? '#f5f5f5' : '#2f2f2f'}
        shadow={'4'}>
        <Text fontSize={25} fontWeight={'600'} pl={25}>
          {name}:
        </Text>
        <Text fontSize={14} pl={25}>
          Počet známek: {data?.user.subjectMarks.length}
        </Text>
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
