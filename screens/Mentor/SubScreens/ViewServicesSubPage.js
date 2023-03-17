import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export const ViewServicesSubPage = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [servicesList, setServicesList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const getServices = async () => {
      const services = await getDocs(
        collection(db, "services")
        // query(collection(db, "services"), where("role", "==", "Mentor"))
      );
      setServicesList(
        services.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setSearchResult(
        services.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getServices();
  }, [isFocused]);

  // getServices();

  const searchServices = (text) => {
    setSearchKey(text);

    setSearchResult(
      servicesList.filter(
        (service) =>
          service.serviceTitle.toLowerCase().includes(text.toLowerCase()) ||
          service.publishedDate.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={10}
        enabled
      >
        {/* Search bar */}
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 30,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#8E8E93"
            onChangeText={(text) => searchServices(text)}
            value={searchKey}
          />

          {/* Service List */}
          <ScrollView style={{ height: 400 }}>
            {searchResult.map((service) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ViewServiceScreen", {
                      service: service,
                    });
                  }}
                  key={service.id}
                >
                  <View style={styles.serviceContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Text style={styles.serviceTitle}>
                          {service.serviceTitle}
                        </Text>
                        <Text style={styles.servicePrice}>
                          {service.servicePrice}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.serviceDate}>
                          {service.publishedDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    fontSize: 13,
    fontWeight: "400",
    color: "#D1D1D6",
  },
  searchIcon: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 20,
    height: 20,
    resizeMode: "contain",
    color: "#8E8E93",
  },
  serviceContainer: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignSelf: "center",
  },
  serviceDetails: {
    marginLeft: 10,
    justifyContent: "space-between",
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1A2042",
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
  },
  serviceDate: {
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
  },
});
