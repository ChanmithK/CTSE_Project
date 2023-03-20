import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { db } from "../../../firebase";

export const ViewMentorsServicesSubPage = (props) => {
  const [servicesList, setServicesList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const navigation = useNavigation();

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

  const searchService = (text) => {
    setSearchKey(text);

    setSearchResult(
      servicesList.filter(
        (service) =>
          service.serviceTitle.toLowerCase().includes(text.toLowerCase()) ||
          service.category.toLowerCase().includes(text.toLowerCase())
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
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchService("website")}
          >
            <Text style={styles.buttonText}>WebSite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Web Development</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => searchService("react")}
          >
            <Text style={styles.buttonText}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>UI/UX</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tag 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tag 3</Text>
          </TouchableOpacity>
          {/* Add more buttons as needed */}
        </ScrollView>
      </View>

      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchResult ? (
            searchResult.map((service) => (
              <TouchableOpacity key={service.id}>
                <View style={styles.serviceCard} key={service.key}>
                  <View style={styles.cardImage}>
                    <Image
                      source={{
                        uri: service.serviceImage,
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
                          <Text
                            style={{
                              color: "grey",
                              fontSize: 13,
                              fontWeight: "normal",
                            }}
                          >
                            (903)
                          </Text>
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
                    <Text style={styles.serviceTitle}>
                      {service.serviceTitle}
                    </Text>
                    <Text style={styles.servicePrice}>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 13,
                          fontWeight: "normal",
                        }}
                      >
                        From
                      </Text>{" "}
                      {service.servicePrice}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              // <Text>{service.serviceTitle}</Text>
            ))
          ) : (
            <Text>No Services Found</Text>
          )}
        </ScrollView>
      </View>

      {/* <View style={{ marginTop: 10 }}>
        <Text>Hello</Text>
      </View> */}
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
    width: "100%",
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
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#111",
  },
});

//Test
