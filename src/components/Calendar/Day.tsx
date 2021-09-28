import React, {useContext, useState} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import DayItem from './DayItem';
import HTMLView from 'react-native-htmlview';
import Emoji from 'react-native-emoji';
import {NetworkStatus} from '@apollo/client';
import {
  Button,
  Center,
  Flex,
  Modal,
  ScrollView,
  Text,
  useColorMode,
} from 'native-base';
import {ActivityIndicator, FlatList} from 'react-native';
import {useCalendarDayQuery} from './Day.codegen';
import Arrows from './Arrows';

const week = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function Day({route}) {
  const {info} = useContext(MyContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState('');
  const {date} = route.params;

  const {loading, error, data, refetch, networkStatus} = useCalendarDayQuery({
    variables: {
      date: date[0] + '-' + date[1] + '-' + date[2],
      key: info?.key as string,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const {colorMode} = useColorMode();

  const leftArrow = () => {
    date[2] -= 1;
    if (date[2] >= 1) {
      refetch({date: date[0] + '-' + date[1] + '-' + date[2], key: info?.key});
    } else {
      date[1] -= 1;
      date[2] = week[date[1] - 1];
      if (date[1] === 0) {
        date[0] = date[0] - 1;
        date[1] = week.length;
        date[2] = week[week.length - 1];
      }
      refetch({date: date[0] + '-' + date[1] + '-' + date[2], key: info?.key});
    }
    console.log('left', data);
  };

  const rightArrow = () => {
    date[2] += 1;
    if (date[2] <= week[date[1] - 1]) {
      refetch({date: date[0] + '-' + date[1] + '-' + date[2], key: info?.key});
    } else {
      date[1] += 1;
      date[2] = 1;
      if (date[1] > 12) {
        date[0] += 1;
        date[1] = 1;
        date[2] = 1;
      }
      refetch({date: date[0] + '-' + date[1] + '-' + date[2], key: info?.key});
    }
    console.log('right', date);
  };

  if (loading || networkStatus === NetworkStatus.refetch) {
    return (
      <>
        <Arrows leftArr={leftArrow} rightArr={rightArrow} date={date} />
        <ActivityIndicator size="large" color="#0000ff" />
      </>
    );
  } else if (error) {
    console.error(error);
  }

  const renderItem = ({item}) => (
    <DayItem
      item={item}
      setModalVisible={setModalVisible}
      setModalTitle={setModalTitle}
      setModalData={setModalData}
    />
  );

  return (
    <Flex flex={1}>
      <Arrows leftArr={leftArrow} rightArr={rightArrow} date={date} />
      <Modal
        //animationType="slide"
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Modal.Content
          justifyContent="flex-end"
          alignItems="center"
          mt={15}
          mb={25}
          maxWidth="400px">
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <HTMLView
                textComponentProps={{
                  style: {color: colorMode === 'light' ? 'black' : 'white'},
                }}
                //value={modalData === null ? '' : modalData.replace(/\s+/g, ' ')} // removes spaces between words
                value={modalData}
                addLineBreaks={false}
              />
            </ScrollView>
          </Modal.Body>

          <Modal.Footer>
            <Button
              borderRadius={'20px'}
              padding="10px"
              position="absolute"
              right="30px"
              bottom="30px"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text fontWeight="bold" textAlign="center">
                Hide Modal
              </Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {data?.user.calendarDay.length === 0 ? (
        <Center>
          <Emoji name=":man-shrugging:" style={{fontSize: 50}} />
        </Center>
      ) : (
        <FlatList
          data={data?.user.calendarDay}
          renderItem={renderItem}
          keyExtractor={item => item.order + item.id}
          extraData={data}
          refreshing={loading}
        />
      )}
    </Flex>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   rowContainer: {
//     height: 100,
//     width: '90%',
//     marginLeft: 20,
//     marginTop: 10,
//     borderRadius: 20,
//     paddingLeft: 15,
//     paddingTop: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   teacher: {
//     marginTop: 2.5,
//     fontSize: 14,
//     color: '#777',
//   },
//   rowText: {
//     flex: 6,
//     paddingTop: 5,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   time: {
//     flex: 1,
//     textAlign: 'center',
//   },
//   title: {
//     paddingLeft: 20,
//     paddingTop: 10,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   arrows: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   number: {
//     fontSize: 25,
//     paddingTop: 8,
//   },
//   subject: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dateText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginTop: 22,
//     marginBottom: 50,
//   },
//   modalView: {
//     width: '90%',
//     height: 250,
//     backgroundColor: 'white',
//     padding: 15,
//     alignItems: 'flex-start',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#FFFF',
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     position: 'absolute',
//     right: 30,
//     bottom: 30,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });
