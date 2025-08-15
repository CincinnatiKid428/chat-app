import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import AndroidActionSheet from './AndroidActionSheet';

// Image selection imports
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
  const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
  const cancelButtonIndex = options.length - 1;

  const [showAndroidActionSheet, setShowAndroidActionSheet] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet(); // only needed for iOS


  //Determines OS and opens appropriate action sheet
  const onActionPress = () => {
    if (Platform.OS === 'ios') {
      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        async (buttonIndex) => handleOptionPress(buttonIndex)
      );
    } else {
      setShowAndroidActionSheet(true); // ✅ Show Android modal
    }
  };

  //Handles option selection from action sheet (iOS or Android)
  const handleOptionPress = async (index) => {
    switch (index) {
      case 0:
        pickImage();
        break;
      case 1:
        takePhoto();
        break;
      case 2:
        await getLocation();
        break;
      default:
        break;
    }
  };

  //Allows user to select an image from library
  const pickImage = () => {
    console.log('user wants to pick an image');
  };

  //Allows user to use camera to take a photo
  const takePhoto = () => {
    console.log('user wants to take a photo');
  };

  //Allows user to send their location
  const getLocation = async () => {
    try {
      const permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions?.granted) {
        const myLocation = await Location.getCurrentPositionAsync({});
        if (myLocation) {
          onSend([{ location: { longitude: myLocation.coords.longitude, latitude: myLocation.coords.latitude } }]);
        } else {
          Alert.alert("Error occurred while fetching location.");
        }
      } else {
        Alert.alert("Location permissions haven't been granted.");
      }
    } catch (error) {
      console.error("Error getting location: ", error);
    }
  };



  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={onActionPress}
      >
        <View style={[styles.wrapper, wrapperStyle]}>
          <Text style={[styles.iconText, iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>

      {/* Render custom Android action sheet */}
      {Platform.OS === 'android' ?
        <AndroidActionSheet
          visible={showAndroidActionSheet}
          onClose={() => setShowAndroidActionSheet(false)}
          options={options}
          onOptionPress={handleOptionPress}
        />
        : null
      }
    </>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  wrapper: {
    borderRadius: 18,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 22,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
