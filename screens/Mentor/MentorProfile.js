import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';
import MentorProfileSubPage from './SubScreens/MentorProfileSubPage';

const MentorProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MentorProfileSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
});

export default MentorProfile;
