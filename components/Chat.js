//components/Chat.js

import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import { GiftedChat, Bubble, SystemMessage, Day } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

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

const Chat = ({ db, route, navigation }) => {

  const [messages, setMessages] = useState([]);

  const userID = route.params.userID;
  const name = route.params.name;
  const selectedBgColor = route.params?.selectedBgColor || '#FFFFFF';
  const contrastColor = getContrastingTextColor(selectedBgColor);

  //This function will add timestamp and fields to message before adding document to Firestore DB
  const onSend = (newMessages) => {
    const messageToAdd = {
      ...newMessages[0],
      createdAt: serverTimestamp(), //Ensures proper Firestore timestamp
      user: {
        _id: userID,
        name: name,
        avatar: 'https://img.buzzfeed.com/buzzfeed-static/static/avatars/tabby_large.jpg'
      }
    }
    try {
      addDoc(collection(db, "Messages"), messageToAdd);
    } catch (err) {
      Alert.alert("Unable to sent message, please try again.");
      console.error("Chat.js|onSend(): Error trying to send new message to Firestore DB: ", err);
    }

  }

  //This function will change colors of message bubbles in the chat 
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  //This function will change color of system message font based on selectedBgColor for high contrast
  const renderSystemMessage = (props) => {
    return <SystemMessage
      {...props}
      containerStyle={{ backgroundColor: selectedBgColor }}
      textStyle={{ color: contrastColor, fontWeight: '600' }}
    />
  }

  //This function will change the color of the Day header component in the chat based on selectedBgColor for high contrast
  const renderDay = (props) => {
    return <Day
      {...props}
      textStyle={{ color: contrastColor, fontWeight: 'bold' }}
    />
  }

  //This function adds a test message and system message into the chat, add to useEffect() for testing purposes
  const addDefaultMessages = () => {
    const now = new Date();
    const earlier = new Date(now.getTime() - 1000); // 1 second earlier

    setMessages([
      {
        _id: 1,
        text: 'Hello developer, this is a test chat message.',
        createdAt: now,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://static.vecteezy.com/system/resources/thumbnails/034/721/323/small_2x/ai-generated-cute-cat-avatar-icon-clip-art-sticker-decoration-simple-background-free-photo.jpg',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: earlier, // Needs to be set 1s earlier so messages display properly, otherwise display of default message & timestamp does not appear
        system: true,
      },
    ]);
  }

  useEffect(() => {
    navigation.setOptions({ title: name });

    //Set up Snapshot listener for Firestore DB
    const q = query(collection(db, "Messages"), orderBy('createdAt', "desc"));
    const unsubscribeMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date() //converts Firestore timestamp to GiftedChat format for each message
        })
      });

      setMessages(newMessages);
    });

    //Slight delay added to allow for component to mount for messages to appear on Android
    const timeout = setTimeout(() => { }, 1000);

    return () => {
      clearTimeout(timeout);
      if (unsubscribeMessages) unsubscribeMessages();
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: selectedBgColor }} edges={['bottom', 'top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? null : 'padding'} // To help with keyboard covering text input
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 75} // adjusted to Android physical device 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              renderDay={renderDay}
              renderSystemMessage={renderSystemMessage}
              onSend={messages => onSend(messages)}
              user={{
                _id: userID,
                name: name,
                avatar: 'https://img.buzzfeed.com/buzzfeed-static/static/avatars/tabby_large.jpg'
              }}
              showUserAvatar={true}
              showAvatarForEveryMessage={false}
              renderUsernameOnMessage={true}
              enableAutomaticScroll={true}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );

}

export default Chat;