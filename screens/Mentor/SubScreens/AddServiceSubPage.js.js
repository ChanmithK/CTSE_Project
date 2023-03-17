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
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const storage = getStorage();

  const addService = async (values) => {
    const docRef = await addDoc(collection(db, "services"), {
      serviceTitle: values._ServiceTitle,
      serviceDescription: values._ServiceDescription,
      servicePrice: values._ServicePrice,
      serviceDuration: values._ServiceDuration,
      publishedDate: "2022/01/23",
      serviceImage: imageURL,
    }).then(navigation.navigate("ViewServices"));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
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

              <View style={{ margin: 30 }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    title="Pick an image from camera roll"
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
                  position: "absolute",
                  top: windowHeight - 150,
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
                  <Text style={styles.buttonText}>Add Service</Text>
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
