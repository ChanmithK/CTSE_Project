import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

const ViewContentSubPage = ({ content, isAuthor }) => {
  const navigation = useNavigation();

  const deleteContent = () => {
    Alert.alert(
      "Delete Content",
      "Are you sure you want to delete this content?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteDoc(doc(db, "Content", content.id));
            navigation.navigate("MyContentList");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textFade}>By {content.authorName}</Text>
          <Text style={styles.textFade}>{content.date}</Text>
        </View>
        <Text style={styles.contentTitle}>{content.title}</Text>
        <View style={styles.scrollContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.contentText}>{content.description}</Text>
          </ScrollView>
        </View>

        {isAuthor && (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#3D3EEF",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                width: "50%",
                alignSelf: "center",
              }}
              onPress={deleteContent}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#3D3EEF",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                alignSelf: "center",
                marginLeft: 10,
              }}
              onPress={() =>
                navigation.navigate("UpdateContent", {
                  content: content,
                })
              }
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EBF0F9",
    height: "100%",
    margin: 20,
  },
  textFade: {
    color: "#19212B",
    fontSize: 12,
    fontWeight: "400",
  },
  contentTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  contentText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  scrollContainer: {
    marginTop: 10,
    height: Dimensions.get("window").height - 220,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
export default ViewContentSubPage;
