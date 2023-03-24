import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import TopBar from '../../../components/Common/TopBar';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const MentorProfileSubPage = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState('');
  const windowHeight = Dimensions.get('window').height;

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const value = await AsyncStorage.getItem('UserID');
            const user = JSON.parse(value);
            const userDoc = doc(db, 'Users', user);
            await deleteDoc(userDoc);

            const userAuth = currentUser(auth);
            await userAuth.delete();

            navigation.navigate('login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const formatTime = (time) => {
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    if (hours > 12) {
      return hours - 12 + ':' + minutes + ' PM';
    } else if (hours == 12) {
      return hours + ':' + minutes + ' PM';
    } else if (hours == 0) {
      return 12 + ':' + minutes + ' AM';
    } else {
      return hours + ':' + minutes + ' AM';
    }
  };

  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem('UserID');
      const user = JSON.parse(value);

      const userDoc = doc(db, 'Users', user);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
      setLoading(false);
    }
    fetchData();
  }, [data]);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#ED6A8C'
          style={{ marginVertical: '100%' }}
        />
      ) : (
        <View style={styles.container}>
          {/* Top bar */}
          <TopBar title={'Profile'} />

          {/* Content */}
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 30,
            }}
          >
            {/* Header Part */}
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View
                style={{
                  backgroundColor: '#D9D9D9',
                  borderRadius: 100,
                  padding: 2,
                  marginRight: 10,
                }}
              >
                <Image
                  source={{
                    uri: data.image,
                  }}
                  style={styles.userImage}
                />
              </View>

              <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                <View
                  style={{ flexDirection: 'row', marginLeft: 8, marginTop: -4 }}
                >
                  <Text
                    style={{
                      color: '#1A2042',
                      fontWeight: '500',
                      fontSize: 24,
                    }}
                  >
                    {data.name}
                  </Text>
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      color: '#1A2042',
                      fontSize: 16,
                      fontWeight: '400',
                    }}
                  >
                    {data.position}
                  </Text>
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      color: '#1A2042',
                      fontSize: 16,
                      fontWeight: '500',
                    }}
                  >
                    {data.sessions} sessions
                  </Text>
                </View>
              </View>
            </View>

            {/* Field data */}
            <View
              style={{
                maxHeight: 450,
                paddingTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <ScrollView>
                <View>
                  <Text style={styles.mainFieldName}>Bio</Text>
                  <Text style={styles.fieldData}>{data.bio}</Text>
                  <Text style={styles.mainFieldName}>Email</Text>
                  <Text style={styles.fieldData}>{data.email}</Text>
                  <Text style={styles.mainFieldName}>Date of birth</Text>
                  <Text style={styles.fieldData}>{data.age}</Text>
                  <Text style={styles.mainFieldName}>Working time</Text>
                  <Text style={styles.fieldData}>
                    {formatTime(data.workingTimeFrom)} -{' '}
                    {formatTime(data.workingTimeTo)}
                  </Text>
                </View>
              </ScrollView>
            </View>

            {/* Buttons */}
            <View
              style={{
                position: 'absolute',
                top: windowHeight - 180,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#EF3D72',
                  width: 180,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 30,
                  marginLeft: 4,
                }}
                onPress={() => handleDelete()}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3D3EEF',
                  width: 180,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 30,
                  //   marginHorizontal: 0,
                }}
                onPress={() => navigation.navigate('mentorProfileUpdate')}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
  userImage: {
    width: 89,
    height: 89,
    borderRadius: 100,
  },
  mainFieldName: {
    color: '#1A2042',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 20,
  },
  fieldData: {
    color: '#19212B',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    border: '2px solid red',
    padding: 10,
    fontSize: 15,
    color: 'black',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#ED6A8C',
    width: '100%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default MentorProfileSubPage;
