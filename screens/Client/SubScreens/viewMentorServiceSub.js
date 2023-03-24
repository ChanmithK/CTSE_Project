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
import { useNavigation } from "@react-navigation/native";

export const ViewMentorServiceSub = ({ service }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 30,
        }}
      >
        <View style={{ marginTop: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 150 }}>
              <Text style={styles.serviceTitle}>{service.serviceTitle}</Text>
              <Image
                source={{
                  uri: service.serviceImage,
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
                display: "flex",
                backgroundColor: "#3D3EEF",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                alignSelf: "center",
                marginLeft: 100,
                marginTop: 20,
                marginBottom: 10,
              }}
              onPress={() => {
                navigation.navigate("create-appointment", { service: service });
              }}
            >
              <Text style={styles.buttonText}>Book An Appointment</Text>
            </TouchableOpacity>
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
