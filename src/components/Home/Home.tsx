import React, {useContext} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import {ActivityIndicator} from 'react-native';
import DaySchedule from './DaySchedule';
import {Flex} from 'native-base';
import {useHomeQuery} from './Home.codegen';
import MyCenter from '../MyCenter';

export default function Home() {
  const {info} = useContext(MyContext);
  const {loading, data} = useHomeQuery({
    variables: {
      key: info?.key as string,
    },
  });

  if (loading) {
    return (
      <MyCenter>
        <ActivityIndicator size="large" color="#0000ff" />
      </MyCenter>
    );
  }

  return (
    <Flex h="100%">
      <DaySchedule data={data?.user.daySchedule} />
      {/* <Tests /> */}
      {/* <Homeworks data={data.Home.homeworks} id={userData.id} /> */}
    </Flex>
  );
}
