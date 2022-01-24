/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Flex, useColorModeValue} from 'native-base';

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

export default function Schedule({navigation}) {
  return (
    <Flex>
      <Calendar
        enableSwipeMonths={true}
        onDayPress={day => {
          navigation.navigate('Day', {
            date: [day.year, day.month, day.day],
          });
        }}
        theme={{
          backgroundColor: useColorModeValue('white', 'black'),
          calendarBackground: useColorModeValue('white', 'black'),
          textSectionTitleColor: useColorModeValue('black', 'white'),
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: useColorModeValue('black', 'white'),
          textDisabledColor: '#e8e4d9',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#00adf5',
          indicatorColor: 'blue',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
      {/* <AddButton /> Think about what you whant */}
    </Flex>
  );
}
