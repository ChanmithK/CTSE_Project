/**
 * @summary: This is the Mentor Registration screen
 * @description:
 *  uses react-native-safe-area-context for safe area view
 **/
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import RegisterForm from '../components/MentorRegister/RegisterForm';

const RegisterMentor = () => {
  return (
    <SafeAreaView>
      <RegisterForm />
    </SafeAreaView>
  );
};

export default RegisterMentor;
