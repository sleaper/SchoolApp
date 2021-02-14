/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {editTime} from '../../utilz';
import {useTheme} from '@react-navigation/native';
import Swipable from 'react-native-gesture-handler/Swipeable';

export default function Homeworks({data}) {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState('');
  const [items, setItems] = useState(data);

  const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.leftAction}>
        <Animated.Text
          style={[
            styles.actionText,
            {color: colors.text, transform: [{scale}]},
          ]}>
          Removed
        </Animated.Text>
      </View>
    );
  };

  const deleteItembyId = (id) => {
    const filteredData = items.filter((item) => item.id !== id);
    setItems(filteredData);
  };

  const renderItem = ({item}) => {
    return (
      <Swipable
        renderLeftActions={LeftActions}
        onSwipeableLeftOpen={() => deleteItembyId(item.id)}>
        <TouchableOpacity
          style={[styles.rowContainer, {backgroundColor: colors.card}]}
          onPress={() => {
            setModalTitle(item.Name);
            setModalData(item.Info);
            setModalVisible(true);
          }}>
          <View style={[styles.itemStripe, {backgroundColor: 'blue'}]} />
          <View style={{paddingBottom: 10, paddingLeft: 15, paddingTop: 15}}>
            <Text style={[styles.subject, {color: colors.text}]}>
              {item.Name}
            </Text>
            <Text style={{color: colors.text}}>{editTime(item.TimeTo)}</Text>
          </View>
        </TouchableOpacity>
      </Swipable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.notification}]}>
        Domácí úkoly
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: colors.card}]}>
            <Text style={[styles.subject, {color: colors.text}]}>
              {modalTitle}
            </Text>
            <ScrollView>
              <HTMLView
                textComponentProps={{style: {color: colors.text}}}
                value={modalData === null ? '' : modalData.replace(/\s+/g, ' ')} // removes spaces between words
                addLineBreaks={false}
              />
            </ScrollView>

            <TouchableHighlight
              underlayColor="#2196F3"
              style={{
                ...styles.openButton,
                backgroundColor: colors.background,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={[styles.textStyle, {color: colors.text}]}>
                Hide Modal
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id;
        }}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowContainer: {
    width: '90%',
    marginLeft: 20,
    borderRadius: 20,
    paddingLeft: 15,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 50,
  },
  modalView: {
    width: '90%',
    height: 250,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFF',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    right: 30,
    bottom: 30,
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
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  leftAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    width: '90%',
    marginLeft: 20,
    borderRadius: 20,
    padding: 20,
  },
  actionText: {
    fontWeight: '600',
    fontSize: 15,
    padding: 15,
  },
  itemStripe: {
    width: 5,
    height: '99%',
  },
});
/*const test = {
  Info:
    '<p>Dobr&#253; den,</p>                                                                                                                                                                                                                                                                                                                                                                                                                       <p>pos&#237;l&#225;m &#250;kol do VV k d&#283;jin&#225;m um&#283;n&#237;. P&#345;ilo&#382;en&#253; pracovn&#237; list Funkcionalimus&#160;vypl&#328;te - vyhledejte informace na internetu nebo v literatu&#345;e. Obr&#225;zky vlo&#382;te z internetu (ke ka&#382;d&#233;mu autorovi 2 - 3 obr&#225;zky). Vypln&#283;n&#253; pracovn&#237; list si zalo&#382;&#237;te a odevzd&#225;te jakmile p&#345;ijdeme do &#353;koly.</p>                                                                                                                                                                                                                                                                                                               <p>Richard Tribula</p>',
  Name: 'Funkcionalismus - pracovní list',
  TimeTo: '2021-02-01T23:59:00',
  id: '306a1991-4376-4209-8874-a27e14e9feb6',
};*/
