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
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../../firebase";
import { Picker } from "@react-native-picker/picker";

const AddContentSchema = Yup.object().shape({
  _title: Yup.string().required("Title is required"),
  _description: Yup.string()
    .required("Description is required")
    .max(500, "Description is too long - should be 500 characters maximum"),
  _category: Yup.string().required("Category is required"),
});

const AddContentSubPage = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [user, setUser] = React.useState(null);
  const contentRef = collection(db, "Content");

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("User");
      setUser(JSON.parse(user));
    };
    // getUser();
  }, []);

  const addContent = async (values) => {
    try {
      await addDoc(contentRef, {
        title: values._title,
        description: values._description,
        category: values._category,
        authorID: "user.id",
        authorName: "user.name",
      }).then(navigation.navigate("Test1"));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Formik
      initialValues={{
        _description: "",
        _category: "",
        _title: "",
        _hashTags: "",
      }}
      onSubmit={(values) => {
        addContent(values);
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
                marginVertical: 30,
              }}
            >
              {/* Field data */}
              <View>
                <ScrollView>
                  <View>
                    <Text style={styles.mainFieldName}>Title</Text>
                    <TextInput
                      style={[styles.input, { height: 40 }]}
                      onChangeText={handleChange("_title")}
                      onBlur={handleBlur("_title")}
                    />
                    {errors._title && (
                      <Text style={{ color: "red" }}>{errors._title}</Text>
                    )}

                    <Text style={styles.mainFieldName}>Category</Text>

                    <Picker
                      style={styles.input}
                      selectedValue={values._category}
                      onValueChange={handleChange("_category")}
                    >
                      <Picker.Item label="Select Category" value="" />
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
                      style={[styles.input, { height: 400 }]}
                      onChangeText={handleChange("_description")}
                      onBlur={handleBlur("_description")}
                    />
                    {errors._description && (
                      <Text style={{ color: "red" }}>
                        {errors._description}
                      </Text>
                    )}
                  </View>
                </ScrollView>
              </View>

              {/* Buttons */}
              <View
                style={{
                  bottom: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Publish</Text>
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
  userImage: {
    width: 149,
    height: 149,
    borderRadius: 100,
    alignSelf: "center",
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

export default AddContentSubPage;
