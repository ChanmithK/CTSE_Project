import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

export const EditServiceSubPage = ({ service }) => {
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");

  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const [selectedCategory, setSelectedCategory] = useState(
    service.serviceCategory
  );

  useEffect(() => {
    setServiceTitle(service.serviceTitle);
    setServiceDescription(service.serviceDescription);
    setServicePrice(service.servicePrice);
    setServiceDuration(service.serviceDuration);
  }, [
    service.serviceTitle,
    service.serviceDescription,
    service.servicePrice,
    service.serviceDuration,
  ]);

  const updateService = async () => {
    const docRef = await updateDoc(doc(db, "services", service.id), {
      serviceTitle: serviceTitle,
      serviceDescription: serviceDescription,
      serviceCategory: selectedCategory,
      servicePrice: servicePrice,
      serviceDuration: serviceDuration,
    }).then(navigation.navigate("ViewServices"));
  };

  return (
    <View style={styles.container}>
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{
                height: windowHeight - 50,
              }}
            >
              <View style={styles.formContainer}>
                <Text style={styles.mainFieldName}>Service Title</Text>
                <TextInput
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setServiceTitle(text)}
                  defaultValue={service.serviceTitle}
                />

                <Text style={styles.mainFieldName}>Service Category</Text>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select a category..." value="" />
                  <Picker.Item label="Business" value="business" />
                  <Picker.Item label="Career" value="career" />
                  <Picker.Item label="Health" value="health" />
                  <Picker.Item label="Education" value="education" />
                  <Picker.Item
                    label="personal development"
                    value="personalDevelopment"
                  />
                </Picker>

                <Text style={styles.mainFieldName}>Service Description</Text>
                <TextInput
                  onChangeText={(text) => setServiceDescription(text)}
                  defaultValue={service.serviceDescription}
                  style={[styles.input, { textAlignVertical: "top" }]}
                  multiline={true}
                  numberOfLines={5}

                  // defaultValue={service.serviceDescription}
                />

                <Text style={styles.mainFieldName}>Service Price</Text>
                <TextInput
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setServicePrice(text)}
                  defaultValue={service.servicePrice}
                  keyboardType="numeric"
                />

                <Text style={styles.mainFieldName}>Service Duration</Text>
                <TextInput
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setServiceDuration(text)}
                  defaultValue={service.serviceDuration}
                  keyboardType="numeric"
                />

                <View
                  style={{
                    // position: "absolute",
                    // top: windowHeight - 210,
                    // flexDirection: "row",
                    // justifyContent: "space-between",
                    marginTop: "35%",
                  }}
                >
                  <TouchableOpacity
                    // onPress={handleSubmit}
                    style={{
                      backgroundColor: "#3D3EEF",
                      width: "100%",
                      padding: 10,
                      height: 50,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginTop: -75,
                      //   marginHorizontal: 0,
                    }}
                    onPress={updateService}
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
  formContainer: {
    // backgroundColor: "#fff",
    padding: 20,
  },

  mainFieldName: {
    color: "#1A2042",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },

  formikErrorMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
});
