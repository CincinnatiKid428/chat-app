//components/Chat.js

import { useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const Chat = ({ route, navigation }) => {

  const name = route.params.name;
  const selectedBgColor = route.params.selectedBgColor;

  useEffect(() => {
    navigation.setOptions({ title: name }); //Adds custom title to screen at top
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: selectedBgColor }]}>
      <Text style={[styles.fontRegular, { color: 'white' }]}>This will have the chat UI later!</Text>
    </View>
  );
}

export default Chat;