import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { StyleSheet } from "react-native";

const LoginScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <LoginForm />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
  },
});
export default LoginScreen;
