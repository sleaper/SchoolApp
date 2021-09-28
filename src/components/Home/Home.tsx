import React, {useContext} from 'react';
import {MyContext} from '../../providers/AuthProvider';
import {ActivityIndicator} from 'react-native';
import DaySchedule from './DaySchedule';
import Homeworks from './Homeworks';
import {Center, Flex, useColorMode} from 'native-base';
import {UserInfo} from '../../generated/graphqlBaseTypes';
import {useHomeQuery} from './Home.codegen';

export default function Home({userData}: {userData: UserInfo; token: string}) {
  const {info} = useContext(MyContext);
  const {colorMode} = useColorMode();
  const {loading, error, data} = useHomeQuery({
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
  }

  return (
    <Flex backgroundColor={colorMode === 'dark' ? 'black' : 'white'} h="100%">
      <DaySchedule data={data?.user.daySchedule} />
      {/* <Tests /> */}
      {/* <Homeworks data={data.Home.homeworks} id={id} /> */}
    </Flex>
  );
}
