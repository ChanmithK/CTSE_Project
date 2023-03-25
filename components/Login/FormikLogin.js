/**
 * @summary: This is the login form component
 * @description:
 *  uses Formik for form validation
 *  uses Yup for validation schema
 *  uses AsyncStorage for storing user data
 *  uses react-navigation for navigation
 *  uses react-native-gesture-handler for scrollview
 *  uses react-native-safe-area-context for safe area view
 *  uses firebase/firestore for querying user data
 *  uses firebase/auth for authentication
 **/
// imports from react-native
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
// imports from react-native-async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// firebase authentication
import { signInWithEmailAndPassword } from "@firebase/auth";
// firebase services
import { auth, db } from "../../firebase";
// react imports
import React, { useState } from "react";
// formik & yup imports
import * as Yup from "yup";
import { Formik } from "formik";
// firebase/firestore imports
import { collection, getDocs, query, where } from "firebase/firestore";
// react-navigation imports
import { useNavigation } from "@react-navigation/native";

// validation schema for login form
const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 characters minimum"),
  email: Yup.string().email().required("Email is required"),
});
// login form
const FormikLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const onLogin = async (email, password) => {
    // setting this to true will show the loading indicator
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        // This paert of the code is for querying the user data from the firestore after success login
        (userCredential) => {
          const user = userCredential.user;
          const usersCollectionRef = collection(db, "Users");
          // This is the query for filtering the user data
          const getUsers = async () => {
            const filterdData = query(
              usersCollectionRef,
              where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(filterdData);
            // This is the user data
            const userData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            // This is the storing of the user data in the AsyncStorage
            AsyncStorage.setItem("UserData", JSON.stringify(userData[0]));
            AsyncStorage.setItem("UserID", JSON.stringify(userData[0].id));
            AsyncStorage.setItem("UserRole", JSON.stringify(userData[0].role));
            // based on the role of the user the user will be redirected to the appropriate screen
            if (userData[0].role === "User") {
              navigation.navigate("ClientHome");
            } else if (userData[0].role === "Admin") {
              navigation.navigate("pendingContent");
            } else {
              console.log("this is a mentor");
              navigation.navigate("ViewAppointmentList");
            }
            // setting this to false will hide the loading indicator
            setLoading(false);
          };
          // calling the getUsers function
          getUsers();
        }
      );
      console.log("Logged in successfully", email, password);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Email or password is incorrect");
      console.log("Error logging in: ", error);
    }
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#3D3EEF"
          style={{ marginVertical: "50%" }}
        />
      ) : (
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            onLogin(values.email, values.password);
          }}
          validationSchema={LoginSchema}
          validateOnMount={false}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.container}>
                <View style={styles.textfield}>
                  <TextInput
                    placeholder="Email address"
                    placeholderTextColor="gray"
                    multiline={false}
                    style={styles.input}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.formikErrorMessage}>{errors.email}</Text>
                )}

                <View style={styles.textfield}>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="gray"
                    multiline={false}
                    style={styles.input}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.formikErrorMessage}>
                    {errors.password}
                  </Text>
                )}
                {errorMessage !== "" &&
                  Alert.alert("Error", errorMessage, [
                    { text: "OK", onPress: () => setErrorMessage("") },
                  ])}
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  textfield: {
    padding: 10,
  },
  input: {
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    marginTop: 20,
  },

  buttonContainer: {
    marginHorizontal: 10,
    paddingVertical: 12,
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
    backgroundColor: "#3D3EEF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  formikErrorMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: -5,
  },
});

export default FormikLogin;
