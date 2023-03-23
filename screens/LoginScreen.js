/**
 * @summary: This is the login screen
 * @description:
 * uses StyleSheet for styling
 *  uses react-native-safe-area-context for safe area view
 **/
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import { StyleSheet } from 'react-native';

const LoginScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <LoginForm />
    </SafeAreaView>
  );
};
// styling
const style = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
  },
});
export default LoginScreen;
