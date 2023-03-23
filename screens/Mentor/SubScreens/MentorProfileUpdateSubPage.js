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

const MentorProfileUpdateSubPage = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const windowHeight = Dimensions.get('window').height;

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
  }, [data.name, data.bio, data.age]);

  const updateProfile = () => {
    const userDoc = doc(db, 'Users', id);
    const formattedDate = date.toISOString().split('T')[0]; // Convert the date object to a string in the format 'yyyy-mm-dd'

    updateDoc(userDoc, {
      name: name,
      bio: bio,
      age: formattedDate,
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
                <Image
                  source={{
                    uri: data.image,
                  }}
                  style={styles.userImage}
                />
              </View>

              {/* Field data */}
              <View style={{ maxHeight: 400 }}>
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
    width: 149,
    height: 149,
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
