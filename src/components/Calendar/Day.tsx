import React, {useContext, useState} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import DayItem from './DayItem';
import HTMLView from 'react-native-htmlview';
import Emoji from 'react-native-emoji';
import {NetworkStatus} from '@apollo/client';
import {Center, Flex, Modal, ScrollView, useColorMode} from 'native-base';
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
          <Modal.CloseButton />
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
          keyExtractor={item => item.id}
          extraData={data}
          refreshing={loading}
        />
      )}
    </Flex>
  );
}
