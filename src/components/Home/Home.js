import React, {useContext} from 'react';
import {MyContext} from '../../AuthProvider';
import {View, StyleSheet} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import Center from '../Center';
import {ActivityIndicator} from 'react-native';
import DaySchedule from './DaySchedule';
import Homeworks from './Homeworks';
import {Flex} from 'native-base';

const getData = gql`
  query($id: String!, $key: String!, $token: String!) {
    Home(id: $id, key: $key, token: $token) {
      schedule
      homeworks
    }
  }
`;

export default function Home({id, modal, setModal, name, token}) {
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
    <Flex flex={1}>
      <DaySchedule data={data.Home.schedule} token={token} />
      {/* <Tests /> */}
      {/* <Homeworks data={data.Home.homeworks} id={id} /> */}
    </Flex>
  );
}
