import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAvoidingView } from "react-native";

const AddServiceSchema = Yup.object().shape({
  _ServiceTitle: Yup.string()
    .required("Title is required!")
    .max(50, "Description is too long - should be 50 characters maximum"),
  _ServicePrice: Yup.string()
    .required("Price is required!")
    .matches(/^[0-9]+$/, "Price must be a number"),
  _ServiceDescription: Yup.string()
    .required("Description is required")
    .max(200, "Description is too long - should be 200 characters maximum"),
  _ServiceDuration: Yup.string().required("Duration is required!"),
});
export const AddServiceSubPage = (props) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const storage = getStorage();

  const addService = async (values) => {
    const date = new Date();
    const dateString = date.toISOString().substring(0, 10);
    if (imageURL != null) {
      const docRef = await addDoc(collection(db, "services"), {
        serviceTitle: values._ServiceTitle,
        serviceCategory: selectedCategory,
        serviceDescription: values._ServiceDescription,
        servicePrice: values._ServicePrice,
        serviceDuration: values._ServiceDuration,
        publishedDate: dateString,
        serviceImage: imageURL,
      }).then(navigation.navigate("ViewServices"));
    } else {
      alert("Wait a minute, image is still uploading!");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.assets[0].uri);
  };

  useEffect(() => {
    const uploadImage = async () => {
      //convert image to blob
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      //Create metadata of the image
      const metadata = {
        contentType: "image/jpeg",
      };

      //Upload the image to firebase storage
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
          });
        }
      );
    };
    if (image != null) {
      uploadImage();
      setImage(null);
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          _ServiceTitle: "",
          _ServicePrice: "",
          _ServiceDescription: "",
          _ServiceDuration: "",
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
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <ScrollView
                style={{
                  height: windowHeight - 50,
                }}
              >
                <View style={styles.formContainer}>
                  <Text style={[styles.mainFieldName, { marginTop: -7 }]}>
                    Service Title
                  </Text>
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

                  <Text style={styles.mainFieldName}>Service Category</Text>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) =>
                      setSelectedCategory(itemValue)
                    }
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
                    style={[styles.input, { textAlignVertical: "top" }]}
                    onChangeText={handleChange("_ServiceDescription")}
                    onBlur={handleBlur("_ServiceDescription")}
                    value={values._ServiceDescription}
                    multiline={true}
                    numberOfLines={5}
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
                    keyboardType="numeric"
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

                  <View style={{ margin: 30 }}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        title="Upload Service Image"
                        onPress={pickImage}
                      />
                      {image && (
                        <Image
                          source={{ uri: image }}
                          style={{ width: 200, height: 200 }}
                        />
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      // marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      // onPress={handleSubmit}
                      style={{
                        backgroundColor: "#3D3EEF",
                        width: "100%",
                        height: 50,
                        borderRadius: 5,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.buttonText}>Add Service</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
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
  picker: {
    height: 40,
    width: "100%",
    color: "black",
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
});
