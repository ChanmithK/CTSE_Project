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
  where,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";

const UpdateAppointmentsub = (data) => {
  const appointmentdata = data.data;
  const InitalState = {
    description: appointmentdata.description,
    date: appointmentdata.date,
    time: appointmentdata.time,
    appointmentID: appointmentdata.appointmentID,
    title: appointmentdata.title,
    serviceTitle: appointmentdata.serviceTitle,
  };

  const navigation = useNavigation();

  const [value, setValue] = useState(InitalState);
  const [error, setError] = useState({
    description: "",
    date: "",
    time: "",
    title: "",
  });
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    handleChange(currentDate.toDateString(), "date");
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
    handleChange(
      currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      "time"
    );
  };

  const handleChange = (value, name) => {
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const ValiDate = () => {
    const tempObj = {};
    tempObj.description = value.description ? "" : "Please enter description";
    tempObj.date = value.date ? "" : "Please enter date";
    tempObj.time = value.time ? "" : "Please enter time";
    tempObj.title = value.title ? "" : "Please enter title";

    setError({
      ...tempObj,
    });

    return Object.values(tempObj).every((x) => x === "");
  };

  const _updateAppointment = async () => {
    if (ValiDate()) {
      try {
        const appointmentRef = doc(
          db,
          "appointments",
          value.appointmentID.trim()
        );
        const appointmentSnap = await getDoc(appointmentRef);

        if (appointmentSnap.exists()) {
          await updateDoc(appointmentRef, {
            description: value.description,
            date: value.date,
            time: value.time,
          });
        } else {
          console.log("No such document!");
        }
        setTimeout(() => {
          navigation.navigate("booked-appointment-list");
        }, 1000);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <Text style={styles.fieldName}>Title</Text>
            <TextInput
              style={styles.textInput}
              // placeholder="Title"
              value={value.serviceTitle}
              editable={false}
            />
            {error.title && (
              <Text style={styles.errorMessage}>{error.title}</Text>
            )}
            <Text style={styles.fieldName}>Description</Text>
            <TextInput
              style={[styles.textInput, { height: 130 }]}
              // placeholder="Description"
              multiline={true}
              numberOfLines={10}
              value={value.description}
              onChangeText={(text) => handleChange(text, "description")}
            />
            {error.description && (
              <Text style={styles.errorMessage}>{error.description}</Text>
            )}
            <Text style={styles.fieldName}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  position: "relative",
                }}
              >
                <TextInput
                  style={[styles.textInput, { flex: 1, paddingRight: 30 }]}
                  // placeholder="Date"
                  value={value.date}
                  editable={false}
                  onChangeText={(text) => handleChange(text, "date")}
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
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
            {error.date && (
              <Text style={styles.errorMessage}>{error.date}</Text>
            )}
            <Text style={styles.fieldName}>Time</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  position: "relative",
                }}
              >
                <TextInput
                  style={[styles.textInput, { flex: 1, paddingRight: 30 }]}
                  // placeholder="Time"
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
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display=""
                onChange={handleTimeChange}
              />
            )}
            {error.time && (
              <Text style={styles.errorMessage}>{error.time}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { height: 40 }]}
              onPress={() => _updateAppointment()}
            >
              <Text style={styles.buttonText}>Update Appointment</Text>
            </TouchableOpacity>
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
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
  },
  inputContainer: {
    padding: 20,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
  },
});

export default UpdateAppointmentsub;
