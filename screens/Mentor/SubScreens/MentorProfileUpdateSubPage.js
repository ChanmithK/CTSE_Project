import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import TopBar from '../../../components/Common/TopBar';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// date & time picker imports
import DateTimePicker from '@react-native-community/datetimepicker';
//
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const MentorProfileUpdateSubPage = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const windowHeight = Dimensions.get('window').height;

  const [workingTimeFrom, setWorkingTimeFrom] = useState(new Date());
  const [workingTimeTo, setWorkingTimeTo] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [localImageUri, setLocalImageUri] = useState(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required');
    }
  };

  const uploadImage = async (uri) => {
    try {
      const storage = getStorage();
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `images/${id}/profilePicture.jpg`);

      // Upload the image to Firebase Storage
      await uploadBytes(imageRef, blob);

      // Get the download URL and update the Firestore document
      const imageUrl = await getDownloadURL(imageRef);
      const userDoc = doc(db, 'Users', id);
      await updateDoc(userDoc, { image: imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setLocalImageUri(result.uri);
      await uploadImage(result.uri);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || workingTimeFrom;
    setShowTimePicker(Platform.OS === 'ios');
    setWorkingTimeFrom(currentTime);
  };

  const onWorkingToChange = (event, selectedTime) => {
    const currentTime = selectedTime || workingTimeTo;
    setShowTimePicker(Platform.OS === 'ios');
    setWorkingTimeTo(currentTime);
  };

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    setShowDatePicker(Platform.OS === 'ios');
    const adjustedDate = new Date(currentDate.getTime() + timezoneOffset);
    setDate(adjustedDate);
  };

  function stringToDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function getTimeFromString(timeString) {
    const hours = parseInt(timeString.split(':')[0], 10);
    const minutes = parseInt(timeString.split(':')[1], 10);

    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0);
    return currentDate;
  }

  const formatTime = (time) => {
    const afternoon = time.split('00')[1].trimStart();
    if (afternoon === 'AM') {
      return time.split(':00')[0];
    } else {
      var hour = parseInt(time.split(':')[0]);
      hour = hour + 12;
      return hour + ':' + time.split(':')[1];
    }
  };

  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem('UserID');
      const user = JSON.parse(value);
      setId(user);

      const userDoc = doc(db, 'Users', user);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
    setName(data.name);
    setBio(data.bio);
    if (data.age) {
      setDate(stringToDate(data.age));
    }
    if (data.workingTimeFrom) {
      setWorkingTimeFrom(getTimeFromString(data.workingTimeFrom));
    }
    if (data.workingTimeTo) {
      setWorkingTimeTo(getTimeFromString(data.workingTimeTo));
    }
    requestPermissions();
  }, [data.name, data.bio, data.age, data.workingTimeFrom, data.workingTimeTo]);

  const updateProfile = () => {
    const userDoc = doc(db, 'Users', id);
    const formattedDate = date.toISOString().split('T')[0]; // Convert the date object to a string in the format 'yyyy-mm-dd'
    const formatttedTime = formatTime(workingTimeFrom.toLocaleTimeString());
    const timeTo = formatTime(workingTimeTo.toLocaleTimeString());
    updateDoc(userDoc, {
      name: name,
      bio: bio,
      age: formattedDate,
      workingTimeFrom: formatttedTime,
      workingTimeTo: timeTo,
    }).then(() => console.log('CounsellorProfileScreen'));
  };

  return (
    <View style={styles.container}>
      {data ? (
        <>
          <KeyboardAvoidingView
            behavior='position'
            keyboardVerticalOffset={10}
            enabled
          >
            {/* Top bar */}
            <TopBar title={'Edit Profile'} />

            {/* Content */}
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 30,
              }}
            >
              {/* Header Part */}
              <View>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={{
                      uri: localImageUri || data.image,
                    }}
                    style={styles.userImage}
                  />
                </TouchableOpacity>
              </View>

              {/* Field data */}
              <View style={{ maxHeight: 600 }}>
                <ScrollView>
                  <View>
                    <Text style={styles.mainFieldName}>Name</Text>
                    <TextInput
                      multiline={true}
                      defaultValue={data.name}
                      style={[styles.input, { height: 40 }]}
                      onChangeText={(text) => setName(text)}
                    />
                    <Text style={styles.mainFieldName}>Bio</Text>
                    <TextInput
                      placeholderTextColor='white'
                      multiline={true}
                      defaultValue={data.bio}
                      style={[styles.input, { height: 145 }]}
                      onChangeText={(text) => setBio(text)}
                      textAlignVertical='top'
                    />
                    <Text style={styles.mainFieldName}>Date of birth</Text>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={[
                        styles.input,
                        { height: 40, justifyContent: 'center' },
                      ]}
                    >
                      <Text>
                        {date
                          ? date.toLocaleDateString()
                          : 'Date not available'}
                      </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                      />
                    )}
                    <Text style={styles.mainFieldName}>Working from</Text>
                    <TouchableOpacity
                      onPress={() => setShowTimePicker(true)}
                      style={[
                        styles.input,
                        { height: 40, justifyContent: 'center' },
                      ]}
                    >
                      <Text>{workingTimeFrom.toLocaleTimeString()}</Text>
                    </TouchableOpacity>

                    {showTimePicker && (
                      <DateTimePicker
                        testID='timePicker'
                        value={workingTimeFrom}
                        mode='time'
                        is24Hour={true}
                        display='default'
                        onChange={onTimeChange}
                      />
                    )}
                    <Text style={styles.mainFieldName}>Working to</Text>
                    <TouchableOpacity
                      onPress={() => setShowTimePicker(true)}
                      style={[
                        styles.input,
                        { height: 40, justifyContent: 'center' },
                      ]}
                    >
                      <Text>{workingTimeTo.toLocaleTimeString()}</Text>
                    </TouchableOpacity>

                    {showTimePicker && (
                      <DateTimePicker
                        testID='timePicker'
                        value={workingTimeTo}
                        mode='time'
                        is24Hour={true}
                        display='default'
                        onChange={onWorkingToChange}
                      />
                    )}
                  </View>
                </ScrollView>
              </View>

              {/* Buttons */}
              <View
                style={{
                  position: 'absolute',
                  top: windowHeight - 180,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // marginTop: 20,
                }}
              >
                <TouchableOpacity
                  // onPress={handleSubmit}
                  style={{
                    backgroundColor: '#3D3EEF',
                    width: '100%',
                    height: 50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 30,
                    //   marginHorizontal: 0,
                  }}
                  onPress={updateProfile}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          <ActivityIndicator
            size='large'
            color='#3D3EEF'
            style={{ marginVertical: '100%' }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#EBF0F9',
    height: '100%',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
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
    backgroundColor: '#ffffff',
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

export default MentorProfileUpdateSubPage;
