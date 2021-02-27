import React, {useContext} from 'react';
import {MyContext} from '../../AuthProvider';
import {View, StyleSheet, Text, Button} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import Center from '../Center';
import {ActivityIndicator} from 'react-native';
import Emoji from 'react-native-emoji';
import DaySchedule from './DaySchedule';
import Homeworks from './Homeworks';
import Tests from './Tests';
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const getData = gql`
  query($id: String!, $key: String!) {
    Home(id: $id, key: $key) {
      schedule
      homeworks
    }
  }
`;

export default function Home({id, modal, setModal, name}) {
  const {colors} = useTheme();
  const {info} = useContext(MyContext);
  const {loading, error, data} = useQuery(getData, {
    variables: {id: id, key: info.key},
  });

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  }

  return (
    <View style={[styles.container, colors.background]}>
      <DaySchedule data={data.Home.schedule} />
      {/* {<Tests />} */}
      <Homeworks data={data.Home.homeworks} id={id} />

      <Modal
        testID={'modal'}
        isVisible={modal}
        onSwipeComplete={() => setModal(!modal)}
        swipeDirection={['down']}
        style={styles.modalView}>
        <View
          style={[
            styles.content,
            {backgroundColor: colors.background, borderTopColor: colors.card},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="person-circle-outline" size={30} color={colors.text} />
            <Text style={[styles.contentTitle, {color: colors.text}]}>
              {name}
            </Text>
          </View>

          <Button
            testID={'close-button'}
            onPress={() => setModal(!modal)}
            title="Close"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
