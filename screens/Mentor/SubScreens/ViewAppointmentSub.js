import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AcceptModel from '../../../components/Mentor/acceptModel';
import DeclineModel from '../../../components/Mentor/declineModel';

const ViewAppointmentSub = (data) => {
  const appointmentdata = data.data;
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState('');
  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [isDeclineModalVisible, setDeclineModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleAcceptModal = () => {
    setAcceptModalVisible(!isAcceptModalVisible);
  };

  const toggleDeclineModal = () => {
    setDeclineModalVisible(!isDeclineModalVisible);
  };

  useEffect(() => {
    setLoading(true);
    setValues(appointmentdata);
    setLoading(false);
  }, []);

  const _acceptAppointment = async (sessionUrl, note) => {
    try {
      const appointmentRef = doc(
        db,
        'appointments',
        appointmentdata.appointmentID.trim()
      );
      const appointmentSnap = await getDoc(appointmentRef);

      if (appointmentSnap.exists()) {
        await updateDoc(appointmentRef, {
          appointmentStatus: 'Accepted',
          sessionUrl: sessionUrl,
          note: note,
        });
        navigation.navigate('ViewAppointmentList');
      } else {
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const _declineAppointment = async (note) => {
    try {
      const appointmentRef = doc(
        db,
        'appointments',
        appointmentdata.appointmentID.trim()
      );
      const appointmentSnap = await getDoc(appointmentRef);

      if (appointmentSnap.exists()) {
        await updateDoc(appointmentRef, {
          appointmentStatus: 'Rejected',
          note: note,
        });
        navigation.navigate('ViewAppointmentList');
      } else {
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error updating document: ', e);
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
        <View style={styles.container}>
          {/* Content */}
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 30,
            }}
          >
            {/* Header Part */}
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{
                  uri: values.serviceImage,
                }}
                style={styles.userImage}
              />
              <View style={{ flexDirection: 'column' }}>
                <View
                  style={{ flexDirection: 'row', marginLeft: 8, marginTop: -4 }}
                >
                  <Text
                    style={{
                      color: '#1A2042',
                      fontWeight: '500',
                      fontSize: 24,
                      marginTop: 4,
                    }}
                  >
                    {values.serviceTitle}
                  </Text>
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      color: '#1A2042',
                      fontSize: 16,
                      fontWeight: '400',
                    }}
                  ></Text>
                </View>
              </View>
            </View>

            {/* Field data */}
            <View style={{ maxHeight: 450 }}>
              <ScrollView>
                <View>
                  <Text style={styles.mainFieldName}>Client Name</Text>
                  <Text style={styles.fieldData}>{values.name}</Text>
                  <Text style={styles.mainFieldName}>Description</Text>
                  <Text style={styles.fieldData}>{values.description}</Text>
                  <Text style={styles.mainFieldName}>Date</Text>
                  <Text style={styles.fieldData}>{values.date}</Text>
                  <Text style={styles.mainFieldName}>Time</Text>
                  <Text style={styles.fieldData}>{values.time}</Text>
                </View>
              </ScrollView>
            </View>

            {/* Buttons */}
            <View
              style={{
                marginHorizontal: 20,
                position: 'absolute',
                top: Dimensions.get('window').height - 200,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <AcceptModel
                close={toggleAcceptModal}
                visible={isAcceptModalVisible}
                accept={_acceptAppointment}
              />
              {values.appointmentStatus === 'Pending' ? (
                <>
                  <View style={{ marginRight: 12 }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={toggleDeclineModal}
                    >
                      <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                  <DeclineModel
                    closeDeclineModal={toggleDeclineModal}
                    visibleDeclineModal={isDeclineModalVisible}
                    decline={_declineAppointment}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={toggleAcceptModal}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F9',
    height: '100%',
    padding: 10,
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
    marginTop: 35,
  },
  fieldData: {
    color: '#19212B',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3D3EEF',
    borderRadius: 5,
    padding: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 250,
    alignSelf: 'center',
    shadowColor: '#000',
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
});

export default ViewAppointmentSub;
