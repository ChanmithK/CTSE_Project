import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import PendingContentListSubPage from './SubScreens/PendingContentListSubPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/Common/TopBar';

const PendingContentList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title='Pending Content List' />
      <PendingContentListSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
});

export default PendingContentList;
