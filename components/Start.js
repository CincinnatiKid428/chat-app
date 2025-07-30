// components/Start.js

import { useEffect, useState } from 'react';
import { ImageBackground, View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import styles from '../styles/styles';

//Import Firebase auth from config file
import { auth } from '../firebase_config';
import { signInAnonymously } from "firebase/auth";

//Start screen background image
const bgImage = require('../assets/bg-image.png');

//Holds static array of background color choices for chat screen
//Add more colors to this array for additional choices
const colorChoices = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];


/*Function renders the Start screen for the application*/
const StartScreen = ({ navigation }) => {

  //State variables
  const [name, setName] = useState(''); //Tracks chat name for user
  const [selectedBgColor, setSelectedBgColor] = useState('#ffffff'); //Tracks background color selected by user (or default white)

  //Function will allow user anonymous authentication
  const signInUser = async () => {
    try {
      const authResult = await signInAnonymously(auth);
      if (authResult) {
        navigation.navigate("Chat", {
          userID: authResult.user.uid,
          name: name,
          selectedBgColor: selectedBgColor
        });

      } else {
        Alert.alert("Unable to sign in to chat, please try again later.");
      }
    } catch (err) {
      console.error("Unable to sign in with error: ", err);
      Alert.alert("Error with signing into chat, please try again later.");
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: '' });
  }, []);

  return (
    <View style={Platform.OS === 'android' ? [styles.container, styles.containerAndroidBottomMargin] : styles.container}>
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

            {/*Map colorChoices array into swatch components*/}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorSwatchBox}
            >
              {colorChoices.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedBgColor(color)}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: color },
                    selectedBgColor === color ? styles.selectedSwatchBorder : null
                  ]}
                />
              ))}
            </ScrollView>
          </View>

          {/*Avatar selection here ? \*/}

          <TouchableOpacity
            style={styles.startChattingButton}
            onPress={signInUser}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

export default StartScreen;