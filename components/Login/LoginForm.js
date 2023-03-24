/**
 * @summary: This login form component uses FormikLogin.js component
 **/
// react-native imports
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
// react imports
import React from 'react';
// FormikLogin component
import FormikLogin from './FormikLogin';
// react-navigation import
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const navigation = useNavigation();
  return (
    <View>
      <LoginImage />
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={-110}
        enabled
      >
        <View style={styles.LoginContaier}>
          <View style={styles.FormikForm}>
            <Text style={styles.MainTitle}>BoostBiz</Text>
            <Text style={styles.SubTitle}>
              Unleash your entrepreneurial potential.
            </Text>
            <View style={{ marginTop: 9 }}>
              <FormikLogin />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('initialPage');
                }}
              >
                <Text style={styles.CreateAccount}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const LoginImage = () => (
  <View>
    <Image
      style={styles.Image}
      source={require('../../assets/Images/BoostBiz.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  LoginContaier: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    elevation: 30,
    backgroundColor: 'white',
    borderRadius: 40,
    height: 500,
    marginTop: 10,
    marginTop: 70,
  },
  FormikForm: {
    padding: 20,
  },
  MainTitle: {
    fontSize: 45,
    marginHorizontal: 8,
    color: '#1A2042',
    fontWeight: '800',
  },
  SubTitle: {
    fontSize: 15,
    marginHorizontal: 8,
    color: '#1A2042',
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 2,
  },
  Image: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginTop: 150,
  },
  CreateAccount: {
    marginTop: 30,
    fontSize: 15,
    alignSelf: 'center',
    color: '#3D3EEF',
  },
});

export default LoginForm;
