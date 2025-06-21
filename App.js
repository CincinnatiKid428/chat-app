import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';

//Import the screens
import Start from './components/Start';
import Chat from './components/Chat';

//Import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins/Poppins-Italic.ttf')
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
      >
        <Stack.Screen
          name="StartScreen"
          component={Start}
        />
        <Stack.Screen
          name="ChatScreen"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
