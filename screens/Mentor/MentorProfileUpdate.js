import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import MentorProfileUpdateSubPage from './SubScreens/MentorProfileUpdateSubPage';

const MentorProfileUpdate = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MentorProfileUpdateSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
});

export default MentorProfileUpdate;
