import React, {useContext} from 'react';
import {MyContext} from '../../AuthProvider';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../theme/ThemeProvider';

const getData = gql`
  query($id: String!, $key: String!, $token: String!) {
    Home(id: $id, key: $key, token: $token) {
      schedule
      homeworks
    }
  }
`;

export default function Home({id, modal, setModal, name, token}) {
  const [{card, text, background}] = useContext(ThemeContext);
  const {info} = useContext(MyContext);
  const {loading, error, data} = useQuery(getData, {
    variables: {id: id, key: info.key, token: token},
  });

  // const filterData = () => {
  //   const filteredData = data.Home.homeworks.filter(
  //     (item) => item.Active === true,
  //   );
  //   return filteredData;
  // };

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" color="#0000ff" />
      </Center>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <DaySchedule data={data.Home.schedule} token={token} />
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
            {backgroundColor: background, borderTopColor: card},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onLongPress={async () => {
                console.log('pressed');
                AsyncStorage.setItem('MyApp:IS_BETA_TESTER', 'true');
              }}>
              <Icon name="person-circle-outline" size={30} color={text} />
            </TouchableOpacity>
            <Text style={[styles.contentTitle, {color: text}]}>{name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Icon name="color-palette-outline" size={30} color={text} />
            <Text style={[styles.contentTitle, {color: text}]}>theme</Text>
          </View>
          <View
            style={{
              backgroundColor: text,
              height: 2,
              width: '100%',
              borderRadius: 10,
              marginBottom: 5,
            }}
          />

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
