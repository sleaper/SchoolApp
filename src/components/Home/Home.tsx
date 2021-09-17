import React, {useContext} from 'react';
import {MyContext} from '../../AuthProvider';
import Center from '../Center';
import {ActivityIndicator} from 'react-native';
import DaySchedule from './DaySchedule';
import Homeworks from './Homeworks';
import {Flex, useColorMode} from 'native-base';
import {UserInfo} from '../../generated/graphqlBaseTypes';
import {useHomeQuery} from './Home.codegen';
import {dayInfo} from '../../types';

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
      <Flex
        borderTopRightRadius={25}
        borderTopLeftRadius={25}
        top={-20}
        zIndex={10}
        shadow={10}
        backgroundColor={
          colorMode === 'dark' ? 'rgb(30, 30, 30)' : 'rgb(255, 255, 255)'
        }>
        <ActivityIndicator size="large" color="#0000ff" />
      </Flex>
    );
  }

  return (
    <Flex
      borderTopRightRadius={25}
      borderTopLeftRadius={25}
      top={-20}
      zIndex={10}
      shadow={10}
      backgroundColor={
        colorMode === 'dark' ? 'rgb(30, 30, 30)' : 'rgb(255, 255, 255)'
      }>
      <DaySchedule data={data?.user.daySchedule} />
      {/* <Tests /> */}
      {/* <Homeworks data={data.Home.homeworks} id={id} /> */}
    </Flex>
  );
}
