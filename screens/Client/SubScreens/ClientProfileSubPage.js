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
import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { Alert } from 'react-native';
import { deleteUser, getAuth } from 'firebase/auth';

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ClientProfileSubPage = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState('');
  const windowHeight = Dimensions.get('window').height;

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

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Show confirmation alert
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                const usersRef = collection(db, 'Users');

                const q = query(usersRef, where('email', '==', user.email));
                const querySnapshot = await getDocs(q);
                let userDocId = null;

                await querySnapshot.forEach((doc) => {
                  userDocId = doc.id;
                });

                await deleteDoc(doc(db, 'Users', userDocId));
                await deleteUser(user);

                navigation.navigate('login');
              } catch (error) {
                console.error('Error deleting account:', error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#ED6A8C'
          style={{ marginVertical: '100%' }}
        />
      ) : (
        data && (
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
                      uri:
                        data.image !== null
                          ? data.image
                          : 'https://cdn-icons-png.flaticon.com/512/2354/2354573.png',
                    }}
                    style={styles.userImage}
                  />
                </View>

                <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 8,
                      marginTop: -4,
                    }}
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
                    <Text style={styles.mainFieldName}>Email</Text>
                    <Text style={styles.fieldData}>{data.email}</Text>
                    <Text style={styles.mainFieldName}>Date of birth</Text>
                    <Text style={styles.fieldData}>{data.age}</Text>
                  </View>
                </ScrollView>
              </View>

              {/* Buttons */}
              <View
                style={{
                  position: 'absolute',
                  top: windowHeight - 180,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  // marginTop: 20,
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
                  }}
                  onPress={handleDeleteAccount}
                >
                  <Text style={styles.buttonText}>Delete Account</Text>
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
                    marginLeft: 10,
                    //   marginHorizontal: 0,
                  }}
                  onPress={() => navigation.navigate('mentorProfileUpdate')}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
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

export default ClientProfileSubPage;
