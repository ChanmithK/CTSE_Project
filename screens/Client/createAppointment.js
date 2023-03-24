import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CreateAppointmentSub from "./SubScreens/createAppointmentSub";

const CreateAppointment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CreateAppointmentSub />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
export default CreateAppointment;
