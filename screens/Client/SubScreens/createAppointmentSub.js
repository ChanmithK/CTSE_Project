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
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const CreateAppointmentsub = (service) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("UserData");
      setUser(JSON.parse(user));
    };
    getUser();
  }, []);

  console.log("first", user);
  const InitalState = {
    description: "",
    date: "",
    time: "",
    userID: "",
    mentorID: service.service.mentorId,
    mentorName: "",
    appointmentID: "",
    name: "",
    email: "",
    serviceTitle: service.service.serviceTitle,
    serviceImage: service.service.serviceImage,
  };

  const navigation = useNavigation();

  const [value, setValue] = useState(InitalState);
  const [error, setError] = useState(InitalState);
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

    setError({
      ...tempObj,
    });

    return Object.values(tempObj).every((x) => x === "");
  };

  const _createAppointment = async () => {
    if (ValiDate()) {
      try {
        const docRef = await addDoc(collection(db, "appointments"), {
          description: value.description,
          date: value.date,
          time: value.time,
          userID: user.userId,
          mentorID: value.mentorID,
          mentorName: "john doe",
          name: user.name,
          email: user.email,
          appointmentStatus: "Pending",
          serviceTitle: value.serviceTitle,
          serviceImage: value.serviceImage,
        }).then(async function (docRef) {
          await updateDoc(doc(db, "appointments", docRef.id), {
            appointmentID: docRef.id,
          });
        });

        navigation.navigate("booked-appointment-list");
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
            <Text style={styles.fieldName}>Service Title</Text>
            <TextInput
              style={styles.textInput}
              // placeholder="Title"
              value={value.serviceTitle}
              defaultValue={value.serviceTitle}
              editable={false}
            />
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
              onPress={() => _createAppointment()}
            >
              <Text style={styles.buttonText}>Create Appointment</Text>
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
    backgroundColor: "#3D3EEF",
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

export default CreateAppointmentsub;
