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

import { useNavigation } from "@react-navigation/native";

export const EditServiceSubPage = ({ service }) => {
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");

  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

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
      servicePrice: servicePrice,
      serviceDuration: serviceDuration,
    }).then(navigation.navigate("ViewServices"));
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.formContainer}>
          <Text style={styles.mainFieldName}>Service Title</Text>
          <TextInput
            style={[styles.input, { height: 40 }]}
            onChangeText={(text) => setServiceTitle(text)}
            defaultValue={service.serviceTitle}
          />

          <Text style={styles.mainFieldName}>Service Description</Text>
          <TextInput
            style={[styles.input, { height: 145 }]}
            onChangeText={(text) => setServiceDescription(text)}
            defaultValue={service.serviceDescription}

            // defaultValue={service.serviceDescription}
          />

          <Text style={styles.mainFieldName}>Service Price</Text>
          <TextInput
            style={[styles.input, { height: 40 }]}
            onChangeText={(text) => setServicePrice(text)}
            defaultValue={service.servicePrice}
          />

          <Text style={styles.mainFieldName}>Service Duration</Text>
          <TextInput
            style={[styles.input, { height: 40 }]}
            onChangeText={(text) => setServiceDuration(text)}
            defaultValue={service.serviceDuration}
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
                marginTop: 1,
                //   marginHorizontal: 0,
              }}
              onPress={updateService}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
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
});
