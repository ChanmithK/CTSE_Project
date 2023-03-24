import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ViewAppointmentSubList = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const getAppointments = async () => {
      const appointmentList = [];
      const appointmentRef = query(
        collection(db, "appointments"),
        where("appointmentStatus", "==", "Pending")
      );
      const appointmentSnapshot = await getDocs(appointmentRef);
      appointmentSnapshot.forEach((doc) => {
        appointmentList.push(doc.data());
      });
      setAppointments(appointmentList);
    };
    getAppointments();
  }, [appointments]);

  const searchAppointments = (text) => {
    setSearch(text);

    setAppointments(
      appointments.filter(
        (appointment) =>
          appointment.time.toLowerCase().includes(text.toLowerCase()) ||
          appointment.date.toLowerCase().includes(text.toLowerCase()) ||
          appointment.description.toLowerCase().includes(text.toLowerCase()) ||
          appointment.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.MainContainer}>
      <View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          multiline={false}
          style={styles.input}
          onChangeText={(text) => searchAppointments(text)}
        />
        <Image
          source={{
            uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
          }}
          style={styles.searchIcon}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 250 }}>
          {appointments.map((appointment, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("ViewAppointment", { data: appointment })
              }
            >
              <View style={styles.appointmentContainer}>
                <Image
                  source={{ uri: appointment.serviceImage }}
                  style={styles.image}
                />
                <Image source={""} style={styles.image} />
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentName}>
                    {" "}
                    {appointment.serviceTitle}{" "}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#3D3EEF",
                      marginBottom: -2,
                    }}
                  >
                    {appointment.name}{" "}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Text style={styles.appointmentDate}>
                      {appointment.date}{" "}
                    </Text>
                    <Text style={styles.appointmentTime}>
                      {appointment.time}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    padding: 15,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    fontSize: 13,
    fontWeight: "400",
    color: "#D1D1D6",
  },
  searchIcon: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 20,
    height: 20,
    resizeMode: "contain",
    color: "#8E8E93",
  },
  appointmentContainer: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignSelf: "center",
  },
  appointmentDetails: {
    marginLeft: 10,
    justifyContent: "center",
  },
  appointmentName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1A2042",
  },
  appointmentDate: {
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
  },
  appointmentTime: {
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
  },
  appointmentStatus: {
    position: "absolute",
    left: 90,
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
    marginTop: 10,
  },
});

export default ViewAppointmentSubList;
