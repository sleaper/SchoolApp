import React, {useContext} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import {ActivityIndicator} from 'react-native';
import Center from '../MyCenter';
import {useAvarageMarksQuery} from './TabsSubjectsAvarege.codegen';
import {
  FlatList,
  Flex,
  Pressable,
  Text,
  useColorModeValue,
  View,
} from 'native-base';

export default function TabsSubjectAvarege({upperNavig}) {
  const {info} = useContext(MyContext);
  const bgColor = useColorModeValue('white', 'black');

  const {loading, error, data} = useAvarageMarksQuery({
    variables: {
      key: info?.key as string,
    },
  });

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItemSubject = ({item}) => {
    return (
      <Pressable
        h="80px"
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderTopWidth={1}
        borderColor="warmGray.400"
        onPress={() => {
          upperNavig.navigate('Subject', {
            name: item.subject,
          });
        }}>
        <View pl={5}>
          <Text fontSize={17} fontWeight={'bold'}>
            {item.subject}
          </Text>
          <Text fontSize={13}>{item.teacher}</Text>
        </View>
        <View mr={10}>
          <Text fontSize={20} fontWeight={'bold'}>
            {item.marks}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <Flex backgroundColor={bgColor} flex={1}>
      <FlatList
        data={data?.user.avarageMarks}
        renderItem={renderItemSubject}
        initialNumToRender={7}
        keyExtractor={item => item.id}
      />
    </Flex>
  );
}
