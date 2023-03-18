import Modal from "react-native-modal";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
// import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
// import { db } from "../../../firebase";

const DeclineModel = ({ closeDeclineModal, visibleDeclineModal }) => {
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState("");

  const handleDecline = () => {
    setErrors("");

    if (note === "") {
      setErrors("Note is required");
    }
    if (note !== "") {
      toggleAcceptModal();
    } else {
    }
  };

  return (
    <Modal isVisible={visibleDeclineModal}>
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 10,
        }}
      >
        <View style={{ padding: 10 }}>
          <TextInput
            placeholder="Note"
            placeholderTextColor="gray"
            multiline={true}
            numberOfLines={6}
            value={note}
            style={[styles.input, { height: 100 }]}
            onChangeText={(text) => setNote(text)}
          />
          {errors && <Text style={styles.errorText}>{errors}</Text>}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              marginVertical: 10,
              marginHorizontal: 10,
              marginLeft: 0,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#8ab4f8",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                // justifyContent: "center",
                width: "50%",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
              onPress={() => closeDeclineModal()}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#8ab4f8",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                alignSelf: "center",
                marginLeft: 10,
                marginTop: 20,
                marginBottom: 10,
              }}
              onPress={() => handleDecline()}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "left",
  },
});

export default DeclineModel;
