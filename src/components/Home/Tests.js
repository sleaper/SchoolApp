import React, {useState, useContext, useEffect} from 'react';
import {MyContext} from '../../AuthProvider';
import {
  Text,
  FlatList,
  Button,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const test = [
  {
    UKOL_ID: 'a7674385-7085-4ea6-9ba6-01b9b28c03f2',
    PREDMET_NAZEV: 'Fyzika (FY)',
    PREDMET_ID: 'E117686',
    NAZEV_UKOLU: 'Stavba a vlastnosti pevných látek',
    PODROBNE_ZADANI:
      '<p><a href="https://moodle.skolskykomplex.cz/course/view.php?id=521#section-5">https://moodle.skolskykomplex.cz/course/view.php?id=521#section-5</a></p>',
    ZPUSOB_ODEVZDANI: 'NEODEVZDAVA_SE',
    ZPUSOB_HODNOCENI: 'NEEVIDOVAT',
    DATUM_ZADANI: '2021-01-06T13:05:00',
    TERMIN_ODEVZDANI: '2021-01-13T13:20:00',
    DATUM_ODEVZDANI: null,
  },
  {
    UKOL_ID: '47d03d2f-b5a9-453a-bc4c-f4a519b3a0fb',
    PREDMET_NAZEV: 'Chemie (CH)',
    PREDMET_ID: 'E119629',
    NAZEV_UKOLU: 'Prvky III. A a IV. A skupiny - opakování',
    PODROBNE_ZADANI:
      '<p>Vypracujte p&#345;ilo&#382;en&#253; pracovn&#237; list a odevzdejte jako p&#345;&#237;lohu na &#352;OL do 15.1.</p>',
    ZPUSOB_ODEVZDANI: 'TEXT_A_PRILOHY',
    ZPUSOB_HODNOCENI: 'PRUBEZNE_ZNAMKY',
    DATUM_ZADANI: '2021-01-06T10:58:00',
    TERMIN_ODEVZDANI: '2021-01-15T23:59:00',
    DATUM_ODEVZDANI: null,
  },
  {
    UKOL_ID: 'f73282b2-4e8d-4818-af53-47507787573d',
    PREDMET_NAZEV: 'Německý jazyk (NJ)',
    PREDMET_ID: 'E117833',
    NAZEV_UKOLU: 'Dvojice sloves',
    PODROBNE_ZADANI:
      '<p>Nau&#269;te se slovesa uveden&#225; v p&#345;&#237;loze</p>',
    ZPUSOB_ODEVZDANI: 'NEODEVZDAVA_SE',
    ZPUSOB_HODNOCENI: 'NEEVIDOVAT',
    DATUM_ZADANI: '2021-01-05T16:57:00',
    TERMIN_ODEVZDANI: '2021-01-15T23:59:00',
    DATUM_ODEVZDANI: null,
  },
];

export default function Tests({data}) {
  const Item = ({subject, when}) => (
    <View style={styles.rowContainer}>
      <Text style={styles.subject}>{subject}</Text>
      <Text style={styles.time}>{when}</Text>
    </View>
  );
  //Add room

  const renderItem = ({item}) => {
    return <Item subject={item.PREDMET_NAZEV} when={item.TERMIN_ODEVZDANI} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testy</Text>
      <FlatList
        initialNumToRender={2}
        data={test}
        renderItem={renderItem}
        keyExtractor={(item) => item.UKOL_ID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  rowContainer: {
    backgroundColor: '#F0F0F0',
    height: 70,
    width: '80%',
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
    color: '#3d3c3c',
  },
  time: {
    textAlign: 'center',
  },
});
