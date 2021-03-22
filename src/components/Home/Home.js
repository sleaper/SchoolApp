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
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Shine,
} from 'rn-placeholder';

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
      {/* <Tests /> */}
      <Homeworks data={data.Home.homeworks} id={id} />
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
