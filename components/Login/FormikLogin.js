import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db, storage } from '../../firebase';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
// validation schema for login form
const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 characters minimum'),
  email: Yup.string().email().required('Email is required'),
});
// login form
const FormikLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const onLogin = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const usersCollectionRef = collection(db, 'Users');
          const getUsers = async () => {
            const filterdData = query(
              usersCollectionRef,
              where('userId', '==', user.uid)
            );
            const querySnapshot = await getDocs(filterdData);

            const userData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            AsyncStorage.setItem('UserData', JSON.stringify(userData[0]));
            AsyncStorage.setItem('UserID', JSON.stringify(userData[0].id));
            AsyncStorage.setItem('UserRole', JSON.stringify(userData[0].role));

            if (userData[0].role === 'User') {
              console.log('this is a regular user');
            } else {
              console.log('this is a mentor');
            }
            setLoading(false);
          };
          getUsers();
          // ...
        }
      );
      console.log('Logged in successfully', email, password);
    } catch (error) {
      console.log('Error logging in: ', error);
    }
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#ED6A8C'
          style={{ marginVertical: '50%' }}
        />
      ) : (
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            onLogin(values.email, values.password);
          }}
          validationSchema={LoginSchema}
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
            <>
              <View style={styles.container}>
                <View style={styles.textfield}>
                  <TextInput
                    placeholder='Email address'
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
                  <Text style={styles.formikErrorMessage}>
                    {errors.password}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      )}
    </>
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
    marginTop: 20,
  },

  buttonContainer: {
    marginHorizontal: 10,
    paddingVertical: 12,
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
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
});

export default FormikLogin;
