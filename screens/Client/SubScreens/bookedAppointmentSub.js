import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

const BookedAppointmentSub = (data) => {
  const appointmentdata = data.data;
  const InitalState = {
    description: appointmentdata.description,
    date: appointmentdata.date,
    time: appointmentdata.time,
    userID: appointmentdata.userID,
    mentorID: appointmentdata.mentorID,
    mentorName: appointmentdata.mentorName,
    appointmentID: appointmentdata.appointmentID,
    name: appointmentdata.name,
    email: appointmentdata.email,
    title: appointmentdata.title,
    appointmentStatus: appointmentdata.appointmentStatus,
    mentorNote: appointmentdata.mentorNote,
    sessionLink: appointmentdata.sessionLink,
  };

  const navigation = useNavigation();

  const [value, setValue] = useState(InitalState);

  const _deleteAppointment = async () => {
    try {
      const appointmentRef = doc(
        db,
        "appointments",
        value.appointmentID.trim()
      );
      const appointmentSnap = await getDoc(appointmentRef);

      if (appointmentSnap.exists()) {
        await deleteDoc(appointmentRef);
      } else {
        console.log("No such document!");
      }
      setTimeout(() => {
        navigation.navigate("booked-appointment-list");
      }, 1000);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <Text style={styles.fieldName}>Status</Text>
            <TextInput
              style={styles.textInput}
              editable={false}
              value={`Mentor ${value.appointmentStatus}`}
            />
            <Text style={styles.fieldName}>Title</Text>
            <TextInput
              style={styles.textInput}
              value={value.title}
              editable={false}
            />
            <Text style={styles.fieldName}>Description</Text>
            <TextInput
              style={[styles.textInput, { height: 130 }]}
              multiline={true}
              editable={false}
              numberOfLines={10}
              value={value.description}
            />
            <Text style={styles.fieldName}>Date</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <TextInput
                style={[styles.textInput, { flex: 1, paddingRight: 30 }]}
                value={value.date}
                editable={false}
              />
              <Image
                source={{
                  uri: "https://img.icons8.com/ios/50/null/calendar-30.png",
                }}
                style={{
                  width: 28,
                  height: 28,
                  position: "absolute",
                  top: 20,
                  right: 10,
                  bottom: 0,
                  margin: "auto",
                }}
              />
            </View>
            <Text style={styles.fieldName}>Time</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <TextInput
                style={[styles.textInput, { flex: 1, paddingRight: 30 }]}
                value={value.time}
                editable={false}
              />
              <Image
                source={{
                  uri: "https://img.icons8.com/ios/50/null/time--v1.png",
                }}
                style={{
                  width: 28,
                  height: 28,
                  position: "absolute",
                  top: 20,
                  right: 10,
                  bottom: 0,
                  margin: "auto",
                }}
              />
            </View>
            <View style={styles.EditCancelbuttonContainer}>
              {value.appointmentStatus !== "Accepted" &&
              value.appointmentStatus !== "Rejected" ? (
                <>
                  <TouchableOpacity
                    style={[styles.customButton, { height: 40 }]}
                  >
                    <Text
                      style={styles.buttonText}
                      onPress={_deleteAppointment}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.customButton, { height: 40 }]}
                    onPress={() =>
                      navigation.navigate("update-appointment", { data: value })
                    }
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
            {value.appointmentStatus === "Accepted" ? (
              <>
                <Text style={styles.fieldName}>Session Link</Text>
                <TextInput
                  style={styles.textInput}
                  value={value.sessionLink}
                  editable={false}
                />
              </>
            ) : null}
            {value.appointmentStatus === "Rejected" ? (
              <>
                <Text style={styles.fieldName}>Mentor Note</Text>
                <TextInput
                  style={[styles.textInput, { height: 130 }]}
                  multiline={true}
                  numberOfLines={10}
                  value={value.mentorNote}
                  editable={false}
                />
              </>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            {value.appointmentStatus === "Accepted" ? (
              <TouchableOpacity style={[styles.button, { height: 40 }]}>
                <Text style={styles.buttonText}>Any Action</Text>
              </TouchableOpacity>
            ) : null}
            {value.appointmentStatus === "Rejected" ? (
              <TouchableOpacity style={[styles.button, { height: 40 }]}>
                <Text style={styles.buttonText}>Book Again</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },

  fieldName: {
    color: "#1A2042",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#8ab4f8",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 200,
    alignSelf: "center",
    shadowColor: "#000",
  },
  inputContainer: {
    padding: 20,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
  },
  EditCancelbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customButton: {
    backgroundColor: "#8ab4f8",
    borderRadius: 5,
    padding: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 240,
    alignSelf: "center",
    shadowColor: "#000",
  },
});

export default BookedAppointmentSub;
