import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
const { useNavigation } = require("@react-navigation/native");

const BookedAppointmentListSub = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getAppointmentList = async () => {
      const appointmentRef = collection(db, "appointments");
      const appointmentSnapshot = onSnapshot(
        appointmentRef,
        (querySnapshot) => {
          const appointmentList = [];
          querySnapshot.forEach((doc) => {
            appointmentList.push(doc.data());
          });

          setAppointmentList(appointmentList);
          setSearchResult(appointmentList);
        }
      );
      return appointmentSnapshot;
    };
    getAppointmentList();
  }, []);

  const searchAppointments = (text) => {
    setSearchKey(text);

    setSearchResult(
      appointmentList.filter(
        (appointment) =>
          appointment.time.toLowerCase().includes(text.toLowerCase()) ||
          appointment.date.toLowerCase().includes(text.toLowerCase()) ||
          appointment.description.toLowerCase().includes(text.toLowerCase()) ||
          appointment.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <View style={styles.MainContainer}>
        <View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            multiline={false}
            style={styles.input}
            onChangeText={(text) => searchAppointments(text)}
            value={searchKey}
          />
          <Image
            source={{
              uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
            }}
            style={styles.searchIcon}
          />
        </View>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 250 }}>
              {searchResult.map((appointment, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("booked-appointment", {
                      data: appointment,
                    })
                  }
                  key={index}
                >
                  <View style={styles.appointmentContainer} key={index}>
                    <Image
                      source={{ uri: appointment.serviceImage }}
                      style={styles.image}
                    />
                    <View style={styles.appointmentDetails}>
                      <Text style={styles.appointmentName}>
                        {appointment.serviceTitle}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "#3D3EEF",
                          marginBottom: -2,
                        }}
                      >
                        {appointment.mentorName}{" "}
                      </Text>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={styles.appointmentDate}>
                          {appointment.date}{" "}
                        </Text>
                        <Text style={styles.appointmentTime}>
                          {" "}
                          {appointment.time}
                        </Text>
                      </View>
                    </View>
                    <View style={{ position: "absolute" }}>
                      {appointment.appointmentStatus === "Rejected" ? (
                        <Image
                          source={{
                            uri: "https://img.icons8.com/ios-glyphs/30/FF3B30/filled-circle.png",
                          }}
                          style={[
                            styles.appointmentStatus,
                            {
                              height: 15,
                              width: 15,
                            },
                          ]}
                        />
                      ) : appointment.appointmentStatus === "Pending" ? (
                        <Image
                          source={{
                            uri: "https://img.icons8.com/ios-glyphs/30/FFCC00/filled-circle.png",
                          }}
                          style={[
                            styles.appointmentStatus,
                            {
                              height: 15,
                              width: 15,
                            },
                          ]}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: "https://img.icons8.com/ios-glyphs/30/4CD964/filled-circle.png",
                          }}
                          style={[
                            styles.appointmentStatus,
                            {
                              height: 15,
                              width: 15,
                            },
                          ]}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
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
    fontsize: 13,
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
    left: 320,
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
    marginTop: 20,
  },
});

export default BookedAppointmentListSub;
