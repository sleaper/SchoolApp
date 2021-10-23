import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AvarageMarks from './Marks/AvarageMarks';
import Icon from 'react-native-vector-icons/Ionicons';
import Subject from './Marks/Subject';
import TabStackMarks from './Marks/TabStackMarks';
import {Button, useColorModeValue} from 'native-base';

const Stack = createStackNavigator();

export default function HomeStack({id}: {id: string}) {
  const iconColor = useColorModeValue('black', 'white');
  return (
    <Stack.Navigator
      mode="modal"
      initialRouteName="Marks"
      screenOptions={{
        headerStyle: {
          backgroundColor: useColorModeValue('white', 'black'),
          height: 60,
          shadowColor: useColorModeValue('black', 'white'),
        },
      }}>
      <Stack.Screen
        options={({navigation}) => ({
          headerRight: () => (
            <Button
              backgroundColor="transparent"
              ml={2}
              onPress={() => navigation.navigate('Settings')}>
              <Icon name={'school-outline'} size={35} color={iconColor} />
            </Button>
          ),
          headerTitle: 'Známky',
        })}
        name="Marks">
        {props => <TabStackMarks {...props} />}
      </Stack.Screen>

      <Stack.Screen
        options={{
          title: 'Předmět',
        }}
        name="Subject">
        {props => <Subject {...props} />}
      </Stack.Screen>

      <Stack.Screen
        options={{
          title: 'Vysvědčení',
        }}
        name="AvarageMarks">
        {props => <AvarageMarks {...props} id={id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
/*
screenOptions={
        ({
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          cardStyle: {backgroundColor: background},
          headerStyle: {backgroundColor: card},
          headerTintColor: text,
        },
        useHeaderOptions())
      }
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={modal.centeredView}>
          <View style={[modal.modalView, {backgroundColor: colors.card}]}>
            <Text style={[modal.modalHeader, {color: colors.text}]}>
              Změnit období
            </Text>
            <TouchableOpacity
              style={modal.modalTime}
              onPress={() => {
                setDate(getLastWeek());
                marksByDateRefetch({variables: {date: date, key: info.key}});
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: colors.text, fontSize: 17}}>
                Poslední týden
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modal.modalTime}
              onPress={() => {
                setDate(getLastMonth());
                marksByDateRefetch({variables: {date: date, key: info.key}});
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: colors.text, fontSize: 17}}>
                Poslední měsíc
              </Text>
            </TouchableOpacity>
            <View style={{alignSelf: 'flex-end', marginTop: 15}}>
              <TouchableOpacity
                style={[modal.button, modal.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[modal.textStyle, {color: colors.text}]}>
                  Zavřít
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>




      const modal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    alignItems: 'flex-start',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FFFF',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTime: {
    margin: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFFFFF',
  },
  item: {
    backgroundColor: '#F0F0F0',
    height: 100,
    width: '90%',
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  rowText: {
    paddingTop: 5,
  },
  Mark: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 18,
  },
  subject: {
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  time: {
    marginTop: 2.5,
    paddingLeft: 10,
    fontSize: 14,
  },
  text: {
    fontSize: 18,
  },
});

<Stack.Screen
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('AvarageMarks')}>
              <Icon name={'school-outline'} size={35} color={colors.text} />
            </TouchableOpacity>
          ),
          headerTitle: 'Známky',
        })}
        name="Marks">
        {(props) => <Marks {...props} id={id} />}
      </Stack.Screen>



*/
