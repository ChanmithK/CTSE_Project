import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const TopBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.icon} source={require("../../assets/arrow.png")} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  icon: {
    top: 2,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1A2042",
  },
});

export default TopBar;
