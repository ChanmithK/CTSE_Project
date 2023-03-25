import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import ClientProfileSubPage from './SubScreens/ClientProfileSubPage';

const ClientProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ClientProfileSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
});

export default ClientProfile;
