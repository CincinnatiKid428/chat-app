// components/Screen1.js

import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const Screen1 = ({ navigation }) => {

  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>Hello Screen1!</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Enter your username here'
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen2', { name: name })}>
        <Text
          style={styles.buttonText}>Go to Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Screen1;