import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { getAuth } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 characters minimum'),
  Repassword: Yup.string()
    .required('Re-enter Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email: Yup.string().email().required('Email is required'),
  fullName: Yup.string().required('FullName is required'),
  age: Yup.string()
    .required('Date of birth is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Age must be a valid date in YYYY-MM-DD format'
    ),
});

const FormikRegister = () => {
  const usersCollectionRef = collection(db, 'Users');
  const auth = getAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const createUser = async (values) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log('Error logging in: ', error);
    }

    try {
      const user = auth.currentUser;
      const docRef = await addDoc(usersCollectionRef, {
        email: values.email,
        name: values.fullName,
        age: values.age,
        userId: user.uid,
        role: 'User',
        image: 'https://cdn-icons-png.flaticon.com/512/2354/2354573.png',
      })
        .then(() => {
          navigation.navigate('login');
        })
        .then(() => {
          console.log('Document written with ID: ', docRef);
        });
      setLoading(false);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        fullName: '',
        age: '',
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
                <Text style={styles.placeholderText}>
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
  datePicker: {
    width: '100%',
  },
  placeholderText: {
    color: 'grey',
    fontSize: 18,
  },
});

export default FormikRegister;
