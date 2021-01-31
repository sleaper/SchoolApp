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
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {editTime} from '../../utilz';
import {useTheme} from '@react-navigation/native';

export default function Homeworks({data}) {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState('');

  //Add room
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.rowContainer, {backgroundColor: colors.card}]}
        onPress={() => {
          setModalTitle(item.Name);
          setModalData(item.Info);
          setModalVisible(true);
        }}>
        <Text style={[styles.subject, {color: colors.text}]}>{item.Name}</Text>
        <Text style={[styles.time, {color: colors.text}]}>
          {editTime(item.TimeTo)}
        </Text>
      </TouchableOpacity>
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
              style={{...styles.openButton, backgroundColor: colors.background}}
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFFFFF',
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowContainer: {
    //backgroundColor: '#F0F0F0',
    height: 80,
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 20,
    paddingTop: 15,
    paddingLeft: 20,
    alignItems: 'flex-start',
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    //color: '#3d3c3c',
  },
  time: {
    textAlign: 'center',
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
    height: 200,
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
});
/*const test = {
  Info:
    '<p>Dobr&#253; den,</p>                                                                                                                                                                                                                                                                                                                                                                                                                       <p>pos&#237;l&#225;m &#250;kol do VV k d&#283;jin&#225;m um&#283;n&#237;. P&#345;ilo&#382;en&#253; pracovn&#237; list Funkcionalimus&#160;vypl&#328;te - vyhledejte informace na internetu nebo v literatu&#345;e. Obr&#225;zky vlo&#382;te z internetu (ke ka&#382;d&#233;mu autorovi 2 - 3 obr&#225;zky). Vypln&#283;n&#253; pracovn&#237; list si zalo&#382;&#237;te a odevzd&#225;te jakmile p&#345;ijdeme do &#353;koly.</p>                                                                                                                                                                                                                                                                                                               <p>Richard Tribula</p>',
  Name: 'Funkcionalismus - pracovní list',
  TimeTo: '2021-02-01T23:59:00',
  id: '306a1991-4376-4209-8874-a27e14e9feb6',
};*/
