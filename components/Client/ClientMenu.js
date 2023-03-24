import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TopBar from "../Common/TopBar";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";

const ClientMenu = () => {
  const navigation = useNavigation();

  const Logout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("login");
    } catch (e) {
      console.error("Error signing out: ", e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TopBar title={"Menu"} />

      <View style={styles.view}>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("BookedAppointmentList")}
        >
          <Text style={styles.text}>Booked Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewMentorsServices")}
        >
          <Text style={styles.text}>Mentor Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewContentList")}
        >
          <Text style={styles.text}>Content</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SignOutView}>
        <TouchableOpacity style={styles.text} onPress={Logout}>
          <Text style={styles.textView}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
  },

  view: {
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 100,
  },

  text: {
    fontSize: 30,
    color: "#1A2042",
    fontFamily: "Roboto",
    fontWeight: "400",
    marginBottom: 25,
  },
  SignOutView: {
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 35,
  },

  textView: {
    fontSize: 20,
    color: "#ED6A8C",
    fontFamily: "Roboto",
    fontWeight: "300",
  },
});

export default ClientMenu;
