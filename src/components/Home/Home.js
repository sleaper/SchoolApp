import React, {useContext} from 'react';
import {MyContext} from '../../AuthProvider';
import {View, StyleSheet} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import Center from '../Center';
import {ActivityIndicator} from 'react-native';
import Emoji from 'react-native-emoji';
import DaySchedule from './DaySchedule';
import Homeworks from './Homeworks';
import Tests from './Tests';
import {useTheme} from '@react-navigation/native';

const getData = gql`
  query($id: String!, $key: String!) {
    Home(id: $id, key: $key) {
      schedule
      homeworks
    }
  }
`;

export default function Home({id}) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
