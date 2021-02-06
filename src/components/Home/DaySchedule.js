import React, {useContext} from 'react';
import {
  Text,
  FlatList,
  Button,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji';
import {useTheme} from '@react-navigation/native';
import Center from '../Center';
import {ThemeContext} from '../theme/ThemeProvider';

export default function DaySchedule({data}) {
  const {colors} = useTheme();
  const {theme} = useContext(ThemeContext);

  function randomHsl() {
    if (theme === 'dark') {
      return 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)';
    }
    return 'hsla(' + Math.random() * 360 + ', 100%, 50%, 0.69)';
  }

  const createColor = () => {
    return {
      backgroundColor: randomHsl(),
      height: 130,
      width: 120,
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 20,
      textColor: 'white',
    };
  };

  const renderItem = ({item}) => {
    return (
      <View style={createColor()}>
        <Text style={styles.time}>{item.TimeFrom.substring(11, 16)}</Text>
        <View style={styles.rowText}>
          <Text style={styles.subject}>{item.Name.substring(0, 3)}</Text>
          <Text style={styles.teacher}>{item.Teacher}</Text>
          <Text style={styles.teacher}>{item.Room}</Text>
        </View>
      </View>
    );
  };
  if (data[0] == null) {
    return (
      <View style={{alignItems: 'center'}}>
        <Emoji name=":man-shrugging:" style={{fontSize: 50}} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {color: colors.notification}]}>Dnes</Text>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.SubjectId}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  rowContainer: {
    backgroundColor: '#F0F0F0',
    height: 130,
    width: 120,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  teacher: {
    marginTop: 2.5,
    fontSize: 14,
    color: '#ffffff',
  },
  rowText: {
    flex: 6,
    paddingTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  time: {
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
