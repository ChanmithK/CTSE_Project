import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ViewPendingContentSubPage = ({ data }) => {
  const navigation = useNavigation();

  const acceptContent = () => {
    Alert.alert(
      'Accept article',
      'Are you sure you want to accept this article?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const ContentDocument = doc(db, 'Content', data.id);
            updateDoc(ContentDocument, {
              status: 'accepted',
            }).then(() => navigation.navigate('pendingContent'));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const rejectContent = () => {
    Alert.alert(
      'Reject article',
      'Are you sure you want to reject this article?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const ContentDocument = doc(db, 'Content', data.id);
            updateDoc(ContentDocument, {
              status: 'rejected',
            }).then(() => navigation.navigate('pendingContent'));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        ></View>
        <Text style={styles.contentTitle}>{data.title}</Text>

        <Text style={styles.textFade}>By {data.authorName}</Text>

        <View style={styles.scrollContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.contentText}>{data.description}</Text>
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#EF3D72',
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
              width: '50%',
              alignSelf: 'center',
            }}
            onPress={() => rejectContent()}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#3D3EEF',
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              alignSelf: 'center',
              marginLeft: 10,
            }}
            onPress={() => acceptContent()}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#EBF0F9',
    height: '100%',
    margin: 20,
  },
  textFade: {
    color: '#19212B',
    fontSize: 12,
    fontWeight: '400',
  },
  contentTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
  contentText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  scrollContainer: {
    marginTop: 10,
    height: Dimensions.get('window').height - 220,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
export default ViewPendingContentSubPage;
