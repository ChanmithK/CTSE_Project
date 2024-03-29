/**
 * @summary: This is the normal User Registration screen
 * @description:
 *  uses react-native-safe-area-context for safe area view
 **/
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import RegisterForm from '../components/UserRegister/RegisterForm';

const RegisterScreenUser = () => {
  return (
    <SafeAreaView>
      <RegisterForm />
    </SafeAreaView>
  );
};

export default RegisterScreenUser;
