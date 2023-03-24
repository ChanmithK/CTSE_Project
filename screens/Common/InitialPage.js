import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
//
const InitialPage = () => {
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
              To get the best user experience please select your role inside
              BoostBiz
            </Text>
            <View style={{ marginTop: 9 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('registerUser')}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('registerMentor')}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Mentor</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: '10%' }}>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.CreateAccount}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
//
const LoginImage = () => (
  <View>
    <Image
      style={styles.Image}
      source={require('../../assets/Images/BoostBiz.png')}
    />
  </View>
);
//
const styles = StyleSheet.create({
  container: {
    // padding: 20,
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  LoginContaier: {
    elevation: 30,
    backgroundColor: 'white',
    borderRadius: 40,
    height: 500,
    marginTop: 100,
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
    fontSize: 17,
    marginHorizontal: 8,
    color: '#1A2042',
    fontFamily: 'Roboto',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
  },
  Image: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginTop: 200,
  },
  CreateAccount: {
    fontSize: 15,
    alignSelf: 'center',
    color: '#3D3EEF',
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#3D3EEF',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default InitialPage;
