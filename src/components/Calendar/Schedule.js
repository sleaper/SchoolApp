/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import Center from '../Center';
import {Text, View, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {gql, useQuery} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import {MyContext} from '../../AuthProvider';
import AddButton from '../Calendar/AddButton';
import {ThemeContext} from '../theme/ThemeProvider';

const getData = gql`
  query($id: String!, $key: String!) {
    Calendar(id: $id, key: $key) {
      schedule
    }
  }
`;

LocaleConfig.locales['cz'] = {
  monthNames: [
    'Leden',
    'Únor',
    'Březen',
    'Duben',
    'Květen',
    'Červen',
    'Červenec',
    'Srpen',
    'Září',
    'Říjen',
    'Listopad',
    'Prosinec',
  ],
  monthNamesShort: [
    'Led',
    'Úno',
    'Bře',
    'Dub',
    'Kvě',
    'Čer',
    'Črv',
    'Srp',
    'Zář',
    'Říj',
    'Lis',
    'Pro',
  ],
  dayNames: [
    'Neděle',
    'Pondělí',
    'Úterý',
    'Středa',
    'Čtvrtek',
    'Pátek',
    'Sobota',
  ],
  dayNamesShort: ['Ne', 'Po', 'Ut', 'St', 'Čt', 'Pa', 'So'],
  today: 'Dnes',
};

LocaleConfig.defaultLocale = 'cz';

const light = {
  calendarBackground: 'white',
  backgroundColor: 'white',
  selectedDayBackgroundColor: 'rgb(0,183,163)',
  selectedDayTextColor: 'white',
  dotColor: 'purple',
  selectedDotColor: 'white',
  textDisabledColor: 'lightgray',
  dayTextColor: 'black',
  monthTextColor: 'black',
  textSectionTitleColor: 'black',
};

const dark = {
  calendarBackground: '#000000',
  backgroundColor: '#2a2a2a',
  selectedDayBackgroundColor: 'brown',
  selectedDayTextColor: 'white',
  dotColor: 'purple',
  selectedDotColor: 'white',
  textDisabledColor: 'gray',
  dayTextColor: 'white',
  monthTextColor: 'white',
  textSectionTitleColor: 'white',
};

export default function Schedule({id, navigation}) {
  const {theme} = useContext(ThemeContext);
  const {info} = useContext(MyContext);
  /*const {loading, error, data} = useQuery(getData, {
    variables: {id: id, key: info.key},
  });*/

  if (theme === 'dark') {
    return (
      <View style={styles.container}>
        <Calendar
          enableSwipeMonths={true}
          onDayPress={(day) => {
            navigation.navigate('Day', {
              date: [day.year, day.month, day.day],
            });
          }}
          theme={dark}
        />
        {/* <AddButton /> */}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Calendar
          enableSwipeMonths={true}
          onDayPress={(day) => {
            console.log(day);
            navigation.navigate('Day', {
              date: [day.year, day.month, day.day],
            });
          }}
          theme={light}
        />
        {/* <AddButton /> Think about what you whant */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    height: 300,
  },
  day: {},
});
