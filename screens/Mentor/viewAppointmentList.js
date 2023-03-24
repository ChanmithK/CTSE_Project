import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import React from "react";
import ViewAppointmentListSub from "./SubScreens/viewAppointmentListSub";
import BottomTabs, {bottomTabIcons} from "../../components/Common/BottomTabs";

const ViewAppointmentList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ViewAppointmentListSub />
      </View>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewAppointmentList;
