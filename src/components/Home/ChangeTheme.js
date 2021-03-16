import React, {useContext} from 'react';
import {Text, View, FlatList, Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ThemeContext} from '../theme/ThemeProvider';
import {themes} from '../theme/Themes';

export default function ChangeTheme() {
  const [{text, background, card}, setTheme] = useContext(ThemeContext);

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
