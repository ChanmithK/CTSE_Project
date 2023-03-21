import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import FormikRegister from './FormikRegister';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterFormUser = () => {
  return (
    <View>
      <LoginImage />
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={-110}
        enabled
      >
        <View style={styles.registerContaier}>
          <View style={styles.FormikForm}>
            <Text style={styles.MainTitle}>Bloom</Text>
            <Text style={styles.SubTitle}>
              You’re one step away from getting started with Bloom.
            </Text>
            <View style={{ marginTop: 15, maxHeight: 570 }}>
              <ScrollView>
                <FormikRegister />
              </ScrollView>
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
  container: {
    // padding: 20,
    flex: 1,
  },
  registerContaier: {
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    height: 700,
    marginTop: 60,
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
    marginTop: 5,
  },
  Image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
  },
  CreateAccount: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#ED6A8C',
  },
});

export default RegisterFormUser;
