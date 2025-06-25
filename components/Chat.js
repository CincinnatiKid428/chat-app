//components/Chat.js

import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';


/*This function takes a background color and determines the brightness of the color, then
returns black or white to be the highest contrast color for font*/
function getContrastingTextColor(bgColor) {
  // Remove hash symbol if present
  const color = bgColor.replace('#', '');

  // Parse r, g, b values
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Calculate brightness (standard formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light backgrounds, white for dark
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

const Chat = ({ route, navigation }) => {

  const name = route.params.name;
  const selectedBgColor = route.params.selectedBgColor;

  useEffect(() => {
    navigation.setOptions({ title: name }); //Adds custom title to screen at top
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: selectedBgColor }]}>
      <Text style={[styles.fontRegular, { color: getContrastingTextColor(selectedBgColor) }]}>This will have the chat UI later!</Text>
    </View>
  );
}

export default Chat;