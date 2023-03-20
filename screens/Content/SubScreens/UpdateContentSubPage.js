import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../../firebase";
import { Picker } from "@react-native-picker/picker";

const AddContentSchema = Yup.object().shape({
  _title: Yup.string().required("Title is required"),
  _description: Yup.string()
    .required("Description is required")
    .max(2000, "Description is too long - should be 2000 characters maximum"),
  _category: Yup.string().required("Category is required"),
});

const UpdateContentSubPage = ({ content }) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const updateContent = async (values) => {
    try {
      const doc = await updateDoc(doc(db, "Content", content.id), {
        title: values._title,
        description: values._description,
        category: values._category,
      });
      navigation.navigate("ViewContentList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        _description: content.description,
        _category: content.category,
        _title: content.title,
      }}
      onSubmit={(values) => {
        updateContent(values);
      }}
      validationSchema={AddContentSchema}
      validateOnMount={false}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-windowHeight / 2}
            enabled
          >
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <View>
                <ScrollView>
                  <View>
                    <Text style={styles.mainFieldName}>Title</Text>
                    <TextInput
                      style={[styles.input, { height: 40 }]}
                      onChangeText={handleChange("_title")}
                      onBlur={handleBlur("_title")}
                      defaultValue={values._title}
                    />
                    {errors._title && (
                      <Text style={{ color: "red" }}>{errors._title}</Text>
                    )}

                    <Text style={styles.mainFieldName}>Category</Text>

                    <Picker
                      style={styles.input}
                      selectedValue={values._category}
                      onValueChange={handleChange("_category")}
                      defaultValue={values._category}
                    >
                      <Picker.Item
                        label={values._category}
                        value={values._category}
                      />
                      <Picker.Item label="Business" value="Business" />
                      <Picker.Item label="IT" value="IT" />
                      <Picker.Item
                        label="App Development"
                        value="App Development"
                      />
                      <Picker.Item
                        label="Online Marketing"
                        value="Online Marketing"
                      />
                      <Picker.Item
                        label="Financial Health"
                        value="Financial Health"
                      />
                      <Picker.Item label="Tutoring" value="Tutoring" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>

                    {errors._category && (
                      <Text style={{ color: "red" }}>{errors._category}</Text>
                    )}
                    <Text style={styles.mainFieldName}>Description</Text>
                    <TextInput
                      placeholderTextColor="white"
                      multiline={true}
                      textAlignVertical="top"
                      style={[styles.input, { height: 450 }]}
                      onChangeText={handleChange("_description")}
                      onBlur={handleBlur("_description")}
                      defaultValue={values._description}
                    />
                    {errors._description && (
                      <Text style={{ color: "red" }}>
                        {errors._description}
                      </Text>
                    )}
                  </View>
                </ScrollView>
              </View>

              <View
                style={{
                  bottom: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
  mainFieldName: {
    color: "#1A2042",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
  },
  fieldData: {
    color: "#19212B",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    border: "2px solid red",
    padding: 10,
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
  button: {
    position: "relative",
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#3D3EEF",
    width: "100%",
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdateContentSubPage;
