import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../../firebase";
import { Picker } from "@react-native-picker/picker";

const UpdateContentSubPage = ({ content }) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [category, setCategory] = useState(content.category);
  const [id, setId] = useState(content.id);

  const updateContent = async () => {
    console.log(content.id);
    try {
      await updateDoc(doc(db, "Content", id), {
        title: title,
        description: description,
        category: category,
      }).then(navigation.navigate("MyContentList"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                  onChangeText={(text) => setTitle(text)}
                  defaultValue={title}
                />

                <Text style={styles.mainFieldName}>Category</Text>

                <Picker
                  style={styles.input}
                  selectedValue={category}
                  onValueChange={(text) => setCategory(text)}
                  defaultValue={category}
                >
                  <Picker.Item
                    label={content.category}
                    value={content.category}
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

                <Text style={styles.mainFieldName}>Description</Text>
                <TextInput
                  placeholderTextColor="white"
                  multiline={true}
                  textAlignVertical="top"
                  style={[styles.input, { height: 450 }]}
                  onChangeText={(text) => setDescription(text)}
                  defaultValue={description}
                />
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
            <TouchableOpacity style={styles.button} onPress={updateContent}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
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
