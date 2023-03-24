import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import ClientProfileUpdateSubPage from './SubScreens/ClientProfileUpdateSubPage';

const ClientProfileUpdate = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ClientProfileUpdateSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
});

export default ClientProfileUpdate;
