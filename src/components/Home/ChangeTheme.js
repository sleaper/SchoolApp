import React, {useContext} from 'react';
import {Text, View, FlatList, Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ThemeContext} from '../theme/ThemeProvider';
import {themes} from '../theme/Themes';
import CheckBox from '@react-native-community/checkbox';

export default function ChangeTheme() {
  const [{text, background, card}, setTheme, setChacked, chacked] = useContext(
    ThemeContext,
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', paddingBottom: 5}}
        onPress={() => {
          setTheme(item.name);
          //setChacked(false);
        }}>
        <Text style={{color: text, fontSize: 18}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{backgroundColor: background}}>
      {/* <TouchableOpacity
        onPress={() => setTheme(undefined)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
          marginTop: 10,
        }}>
        <Text style={{fontSize: 18, color: text}}>Auto theme</Text>
         <CheckBox
          disabled={false}
          value={chacked}
          onValueChange={() => setChacked(!chacked)}
        /> 
      </TouchableOpacity> */}

      <FlatList
        data={themes}
        keyExtractor={({name}) => name}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{height: 5, backgroundColor: card}} />
        )}
      />
    </View>
  );
}
