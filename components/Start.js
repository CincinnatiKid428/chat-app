// components/Start.js

import { useEffect, useState } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';

const bgImage = require('../assets/bg-image.png');

const StartScreen = ({ navigation }) => {

  //State variable tracking chat name for user
  const [name, setName] = useState('');
  //State variable tracking background color selected by user (or default white)
  const [selectedBgColor, setSelectedBgColor] = useState('#ffffff');

  useEffect(() => {
    navigation.setOptions({ title: '' });
    //navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={styles.backgroundImage}
      >

        <View style={styles.startTitleBox}>
          <Text style={[styles.textAppTitle, styles.fontBold]}>Chatter Box</Text>
        </View>

        <View style={styles.startSelectionsBox}>

          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />

          {/*Background color selection components\*/}
          <View style={styles.bgColorInput}>
            <Text style={styles.bgColorInputText}>Choose Background Color:</Text>
            <View style={styles.colorSwatchBox}>
              <TouchableOpacity
                style={styles.bgColorChoice1}
                onPress={() => { setSelectedBgColor('#090C08') }}
              />
              <TouchableOpacity
                style={styles.bgColorChoice2}
                onPress={() => { setSelectedBgColor('#474056') }}
              />
              <TouchableOpacity
                style={styles.bgColorChoice3}
                onPress={() => { setSelectedBgColor('#8A95A5') }}
              />
              <TouchableOpacity
                style={styles.bgColorChoice4}
                onPress={() => { setSelectedBgColor('#B9C6AE') }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.startChattingButton}
            onPress={() => {
              name ?
                navigation.navigate('ChatScreen', { name: name, selectedBgColor: selectedBgColor })
                : Alert.alert('Please enter your name to continue.');
            }}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

export default StartScreen;