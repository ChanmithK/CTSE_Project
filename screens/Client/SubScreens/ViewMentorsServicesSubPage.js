import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { db } from "../../../firebase";

export const ViewMentorsServicesSubPage = (props) => {
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
  }, []);

  console.log("searchResult", searchResult);

  const searchService = (text) => {
    setSearchKey(text);

    setSearchResult(
      servicesList.filter((service) =>
        service.serviceTitle.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* SearchBar */}
      <View>
        <TextInput
          placeholder="Search Services"
          placeholderTextColor="gray"
          multiline={false}
          style={styles.input}
          onChangeText={(text) => searchService(text)}
          value={searchKey}
        />
        <Image
          source={{
            uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
          }}
          style={styles.searchIcon}
        />
      </View>
      {searchResult.map((service) => (
        <TouchableOpacity>
          <View style={styles.serviceCard}>
            <View style={styles.cardImage}>
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardTop}>
                <View style={styles.ratingBar}>
                  <Icon
                    name="star"
                    type="font-awesome"
                    color="orange"
                    size={16}
                    style={{ marginRight: 2 }}
                  />
                  <Text style={styles.ratings}>
                    5.0{" "}
                    <span
                      style={{
                        color: "grey",
                        fontSize: 13,
                        fontWeight: "normal",
                      }}
                    >
                      (903)
                    </span>
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon
                    name="heart"
                    type="font-awesome"
                    color="#f50"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.serviceTitle}>{service.serviceTitle}</Text>
              <Text style={styles.servicePrice}>
                <span
                  style={{
                    color: "grey",
                    fontSize: 13,
                    fontWeight: "normal",
                  }}
                >
                  From
                </span>{" "}
                ${service.servicePrice}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
    paddingHorizontal: 10,
  },

  serviceCard: {
    height: 130,
    width: "100% ",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    // margin: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    height: "100%",
    width: "40%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
  },

  image: {
    height: "100%",
    width: "100%",
  },
  cardContent: {
    position: "relative",
    height: "100%",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 10,
  },
  cardTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  ratingBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  serviceTitle: {
    fontSize: 17,
    marginBottom: 20,
    fontWeight: "500",
  },
  ratings: {
    fontSize: 16,
    marginBottom: 2,
    color: "orange",
  },
  servicePrice: {
    position: "absolute",
    bottom: 10,
    right: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
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
});
