import { View, StyleSheet } from 'react-native';
import React from 'react';
import ViewPendingContentSubPage from './SubScreens/ViewPendingContentSubPage';
import TopBar from '../../components/Common/TopBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewPendingContent = ({ route }) => {
  const data = route.params.data;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title='' />
      <ViewPendingContentSubPage data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
});

export default ViewPendingContent;
