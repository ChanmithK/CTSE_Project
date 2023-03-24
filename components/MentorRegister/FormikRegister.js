/**
 * @summary: This is the mentor registration form component
 * @description:
 *  uses Formik for form validation
 *  uses Yup for validation schema
 *  uses AsyncStorage for storing user data
 *  uses react-navigation for navigation
 *  uses react-native-gesture-handler for scrollview
 *  uses react-native-safe-area-context for safe area view
 *  uses firebase/firestore for querying user data
 *  uses firebase/auth for authentication
 **/
// imports from react-native
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
// react imports
import React, { useState } from 'react';
// formik & yup imports
import * as Yup from 'yup';
import { Formik } from 'formik';
// firebase/firestore imports
import { addDoc, collection } from 'firebase/firestore';
// firebase services
import { db } from '../../firebase';
// firebase/authentication imports
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { getAuth } from '@firebase/auth';
// react-navigation imports
import { useNavigation } from '@react-navigation/native';
// date & time picker imports
import DateTimePicker from '@react-native-community/datetimepicker';

// validation schema for registration form
const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 characters minimum'),
  Repassword: Yup.string()
    .required('Re-enter Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email: Yup.string().email().required('Email is required'),
  fullName: Yup.string().required('Full Name is required'),
  age: Yup.string().required('Age is required'),
  workingTimeFrom: Yup.string().required('Working Time From is required'),
  workingTimeTo: Yup.string().required('Wroking Time To is required'),
  bio: Yup.string()
    .required('Bio is required')
    .max(100, 'Bio is too long - should be 200 characters maximum'),
  position: Yup.string().required('Position is required'),
});

const FormikRegister = () => {
  const usersCollectionRef = collection(db, 'Users');
  const auth = getAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);

  const createUser = async (values) => {
    // setting this to true will show the loading indicator
    setLoading(true);
    // firebase authentication for registering the mentor
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      Alert('Error logging in: ', error);
    }
    // firebase firestore for adding the mentor data to the database
    try {
      const user = auth.currentUser;
      await addDoc(usersCollectionRef, {
        email: values.email,
        name: values.fullName,
        age: values.age,
        userId: user.uid,
        role: 'Mentor',
        sessions: 0,
        workingTimeFrom: values.workingTimeFrom,
        workingTimeTo: values.workingTimeTo,
        bio: values.bio,
        position: values.position,
        image: 'https://cdn-icons-png.flaticon.com/512/2354/2354573.png',
      }).then(() => {
        navigation.navigate('login');
      });
      // setting this to false will hide the loading indicator
      setLoading(false);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  // function to remove seconds from the time picker
  function removeSeconds(timeString) {
    const timeParts = timeString.split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        name: '',
        age: '',
        bio: '',
        position: '',
        workingTimeFrom: '',
        workingTimeTo: '',
        image: 'https://cdn-icons-png.flaticon.com/512/2354/2354573.png',
      }}
      onSubmit={(values) => {
        createUser(values);
      }}
      validationSchema={RegisterSchema}
      validateOnMount={false}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={{ marginBottom: 100 }}>
          <View style={styles.container}>
            <View style={styles.textfield}>
              <TextInput
                placeholder='Full Name'
                placeholderTextColor='gray'
                multiline={false}
                style={styles.input}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
            </View>
            {errors.fullName && touched.fullName && (
              <Text style={styles.formikErrorMessage}>{errors.fullName}</Text>
            )}

            <View style={styles.textfield}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
              >
                <Text
                  style={[
                    styles.placeholderText,
                    values.age && { color: 'black' },
                  ]}
                >
                  {values.age ? values.age : 'DOB (YYYY-MM-DD)'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={values.age ? new Date(values.age) : new Date()}
                  mode='date'
                  display='default'
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      handleChange('age')(
                        selectedDate.toISOString().split('T')[0]
                      );
                    }
                  }}
                />
              )}
            </View>
            {errors.age && touched.age && (
              <Text style={styles.formikErrorMessage}>{errors.age}</Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder='Bio'
                placeholderTextColor='gray'
                multiline={true}
                style={[styles.input, { height: 120 }]}
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                textAlignVertical='top'
              />
            </View>
            {errors.bio && touched.bio && (
              <Text style={styles.formikErrorMessage}>{errors.bio}</Text>
            )}

            <View style={styles.textfield}>
              <TouchableOpacity
                onPress={() => setShowFromTimePicker(true)}
                style={styles.input}
              >
                <Text
                  style={[
                    styles.placeholderText,
                    values.workingTimeFrom && { color: 'black' },
                  ]}
                >
                  {values.workingTimeFrom
                    ? `Working time to: ${removeSeconds(
                        values.workingTimeFrom
                      )}` // Use the removeSeconds function here
                    : 'Set working time to'}
                </Text>
              </TouchableOpacity>
              {showFromTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode='time'
                  display='default'
                  onChange={(event, selectedDate) => {
                    setShowFromTimePicker(false);
                    if (selectedDate) {
                      handleChange('workingTimeFrom')(
                        removeSeconds(selectedDate.toTimeString().split(' ')[0])
                      );
                    }
                  }}
                />
              )}
            </View>
            {errors.workingTimeFrom && touched.workingTimeFrom && (
              <Text style={styles.formikErrorMessage}>
                {errors.workingTimeFrom}
              </Text>
            )}
            <View style={styles.textfield}>
              <TouchableOpacity
                onPress={() => setShowToTimePicker(true)}
                style={styles.input}
              >
                <Text
                  style={[
                    styles.placeholderText,
                    values.workingTimeTo && { color: 'black' },
                  ]}
                >
                  {values.workingTimeTo
                    ? `Working time to: ${removeSeconds(values.workingTimeTo)}` // Use the removeSeconds function here
                    : 'Set working time to'}
                </Text>
              </TouchableOpacity>
              {showToTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode='time'
                  display='default'
                  onChange={(event, selectedDate) => {
                    setShowToTimePicker(false);
                    if (selectedDate) {
                      handleChange('workingTimeTo')(
                        removeSeconds(selectedDate.toTimeString().split(' ')[0])
                      );
                    }
                  }}
                />
              )}
            </View>
            {errors.workingTimeTo && touched.workingTimeTo && (
              <Text style={styles.formikErrorMessage}>
                {errors.workingTimeTo}
              </Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder='Position'
                placeholderTextColor='gray'
                multiline={false}
                style={styles.input}
                onChangeText={handleChange('position')}
                onBlur={handleBlur('position')}
                value={values.position}
              />
            </View>
            {errors.position && touched.position && (
              <Text style={styles.formikErrorMessage}>{errors.position}</Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder='Email'
                placeholderTextColor='gray'
                multiline={false}
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={styles.formikErrorMessage}>{errors.email}</Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor='gray'
                multiline={false}
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.formikErrorMessage}>{errors.password}</Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder='Re-enter Password'
                secureTextEntry={true}
                placeholderTextColor='gray'
                multiline={false}
                style={styles.input}
                onChangeText={handleChange('Repassword')}
                onBlur={handleBlur('Repassword')}
                value={values.Repassword}
              />
            </View>
            {errors.Repassword && touched.Repassword && (
              <Text style={styles.formikErrorMessage}>{errors.Repassword}</Text>
            )}
          </View>

          {loading ? (
            <ActivityIndicator size='large' color='#0000ff' />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  bioTextField: {
    padding: 10,
  },
  textfield: {
    padding: 10,
  },
  input: {
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    marginTop: 5,
  },

  buttonContainer: {
    marginHorizontal: 10,
    paddingVertical: 12,
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
    backgroundColor: '#3D3EEF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  formikErrorMessage: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -5,
  },
  pickerStyle: {
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    fontSize: 12,
  },
  datePicker: {
    width: '100%',
  },
  placeholderText: {
    color: 'grey',
    fontSize: 18,
  },
});

export default FormikRegister;
