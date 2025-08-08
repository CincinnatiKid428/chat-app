// styles/styles.js

import { StyleSheet } from 'react-native';

//Toggle this to 2 (on) or 0 (off) to enable/disable all debug borders
const debugBorderWidth = 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerAndroidBottomMargin: {
    marginBottom: '15%'
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  fontSizeNormal: {
    fontSize: 16
  },

  /****** Poppins Font Family Classes ******************START*/
  fontRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },

  fontBold: {
    fontFamily: 'Poppins-Bold'
  },

  fontItalic: {
    fontFamily: 'Poppins-Italic'
  },
  /****** Poppins Font Family Classes ********************END*/

  textAppTitle: {
    fontSize: 45,
    fontWeight: 600,
    color: '#fff',
    marginTop: '6%'
  },

  startTitleBox: {
    flex: 40,
    width: '88%',
    marginTop: '6%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: debugBorderWidth,
    borderColor: 'purple'
  },

  startSelectionsBox: {
    flex: 48,
    width: '88%',
    marginBottom: '6%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: debugBorderWidth,
    borderColor: 'green'
  },

  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderWidth: 2,
    borderColor: '#757083',
    borderRadius: 5,
    opacity: 1
  },
  userInput: {
    width: "88%",
    borderWidth: debugBorderWidth,
    marginBottom: 7,
    borderColor: 'red'
  },
  userInputText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1
  },
  swatchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    gap: 15,
    borderWidth: debugBorderWidth,
    borderColor: 'blue'
  },

  circleSwatch: {
    height: 46,
    width: 46,
    borderRadius: 23,
  },

  selectedSwatchBorder: {
    borderWidth: 4,
    borderColor: '#757083',
  },

  startChattingButton: {
    width: '88%',
    backgroundColor: '#757083',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '6%'
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
export default styles;