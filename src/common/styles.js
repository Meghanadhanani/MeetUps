// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#242424', // dark background
    justifyContent: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
    color: '#fff', // white text
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#1e1e1e', // dark input bg
  },
  button: {
    backgroundColor: '#FFAB11', // Instagram blue
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  forgot: {
    color: '#FFAB11',
    textAlign: 'center',
    marginBottom: 30,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#444', // lighter line for contrast
  },
  or: {
    marginHorizontal: 10,
    color: '#999',
  },
  signupText: {
    textAlign: 'center',
    color: '#aaa',
  },
  signupLink: {
    color: '#FFAB11',
    fontWeight: '600',
  },
  googleButton: {
    // backgroundColor: '#FFAB11',
    // padding: 12,
    // borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  customGoogleBtn: {
    backgroundColor: '#FFAB11', // Google red
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  
  googleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});
