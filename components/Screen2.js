// components/Screen2.js

import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles/styles';

const Screen2 = ({ route, navigation }) => {

  const name = route.params.name;

  useEffect(() => {
    navigation.setOptions({ title: name }); //Adds custom title to screen at top
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>Hello Screen2!</Text>
    </View>
  );
}

export default Screen2;