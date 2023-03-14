import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
/**
 * @author
 * @function ViewServiceSubPage
 **/
export const ViewServiceSubPage = ({ service }) => {
  const navigation = useNavigation();
  const [isDeclineModalVisible, setDeclineModalVisible] = useState(false);
  const toggleDeclineModal = () => {
    setDeclineModalVisible(!isDeclineModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      {/* <TopBar title={""} /> */}

      {/* Content */}
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 30,
        }}
      >
        {/* Atricles List */}
        <View style={{ marginTop: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 150 }}>
              <Text style={styles.serviceTitle}>{service.serviceTitle}</Text>
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                }}
                style={styles.image}
              />
              <Text style={styles.serviceText}>
                {service.serviceDescription}
              </Text>
              <Text style={styles.servicePrice}>
                Author: {service.servicePrice}
              </Text>
              <Text style={styles.serviceDate}>
                Category: {service.publishedDate}
              </Text>
            </View>
          </ScrollView>
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
                backgroundColor: "#ED6A8C",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                // justifyContent: "center",
                width: "50%",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
              onPress={toggleDeclineModal}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#ED6A8C",
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
              onPress={() => {
                navigation.navigate("EditServiceScreen", { service: service });
              }}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <Modal isVisible={isDeclineModalVisible}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#1A2042",
                    marginBottom: 10,
                  }}
                >
                  Are you sure to delete service?
                </Text>

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
                      backgroundColor: "#ED6A8C",
                      padding: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                      alignSelf: "center",
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    onPress={toggleDeclineModal}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ED6A8C",
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
                    onPress={() => {
                      async function deleteData() {
                        const serviceDoc = doc(db, "services", service.id);
                        await deleteDoc(serviceDoc);
                      }
                      deleteData().then(navigation.navigate("ViewServices"));
                    }}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 21,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1A2042",
  },
  serviceText: {
    fontSize: 13,
    color: "#1A2042",
    marginTop: 34,
    lineHeight: 22,
    fontWeight: "400",
  },
  servicePrice: {
    fontSize: 13,
    color: "#1A2042",
    marginTop: 34,
    fontWeight: "500",
  },
  serviceDate: {
    fontSize: 13,
    color: "#1A2042",
    marginTop: 3,
    fontWeight: "500",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
