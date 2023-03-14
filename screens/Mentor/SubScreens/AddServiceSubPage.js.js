import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

const AddServiceSchema = Yup.object().shape({
  _ServiceTitle: Yup.string()
    .required("Title is required!")
    .max(50, "Description is too long - should be 50 characters maximum"),
  _ServicePrice: Yup.string()
    .required("Price is required!")
    .max(50, "Description is too long - should be 50 characters maximum"),
  _ServiceDescription: Yup.string()
    .required("Description is required")
    .max(200, "Description is too long - should be 200 characters maximum"),
});
export const AddServiceSubPage = (props) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const addService = async (values) => {
    const docRef = await addDoc(collection(db, "services"), {
      serviceTitle: values._ServiceTitle,
      serviceDescription: values._ServiceDescription,
      servicePrice: values._ServicePrice,
      serviceDuration: values._ServiceDuration,
      publishedDate: "2022/01/23",
    }).then(navigation.navigate("ViewServices"));
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          _ServiceTitle: "",
          _ServicePrice: "",
          _ServiceDescription: "",
        }}
        onSubmit={(values) => {
          addService(values);
        }}
        validationSchema={AddServiceSchema}
        validateOnMount={false}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={styles.formContainer}>
              <Text style={styles.mainFieldName}>Service Title</Text>
              <TextInput
                style={[styles.input, { height: 40 }]}
                onChangeText={handleChange("_ServiceTitle")}
                onBlur={handleBlur("_ServiceTitle")}
                value={values._ServiceTitle}
              />
              {errors._ServiceTitle && touched._ServiceTitle ? (
                <Text style={styles.formikErrorMessage}>
                  {errors._ServiceTitle}
                </Text>
              ) : null}

              <Text style={styles.mainFieldName}>Service Description</Text>
              <TextInput
                style={[styles.input, { height: 145 }]}
                onChangeText={handleChange("_ServiceDescription")}
                onBlur={handleBlur("_ServiceDescription")}
                value={values._ServiceDescription}
              />

              {errors._ServiceDescription && touched._ServiceDescription ? (
                <Text style={styles.formikErrorMessage}>
                  {errors._ServiceDescription}
                </Text>
              ) : null}

              <Text style={styles.mainFieldName}>Service Price</Text>
              <TextInput
                style={[styles.input, { height: 40 }]}
                onChangeText={handleChange("_ServicePrice")}
                onBlur={handleBlur("_ServicePrice")}
                value={values._ServicePrice}
              />

              {errors._ServicePrice && touched._ServicePrice ? (
                <Text style={styles.formikErrorMessage}>
                  {errors._ServicePrice}
                </Text>
              ) : null}

              <Text style={styles.mainFieldName}>Service Duration</Text>
              <TextInput
                style={[styles.input, { height: 40 }]}
                onChangeText={handleChange("_ServiceDuration")}
                onBlur={handleBlur("_ServiceDuration")}
                value={values._ServiceDuration}
              />

              {errors._ServiceDuration && touched._ServiceDuration ? (
                <Text style={styles.formikErrorMessage}>
                  {errors._ServiceDuration}
                </Text>
              ) : null}

              <View
                style={{
                  position: "absolute",
                  top: windowHeight - 210,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // marginTop: 20,
                }}
              >
                <TouchableOpacity
                  // onPress={handleSubmit}
                  style={{
                    backgroundColor: "#ED6A8C",
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
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Make Appointment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
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
