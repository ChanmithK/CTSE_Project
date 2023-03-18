import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAppointment from "./screens/Client/createAppointment";
import BookedAppointment from "./screens/Client/bookedAppointment";
import UpdateAppointment from "./screens/Client/updateAppointment";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="update-appointment"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="create-appointment" component={CreateAppointment} />
        <Stack.Screen name="booked-appointment" component={BookedAppointment} />
        <Stack.Screen name="update-appointment" component={UpdateAppointment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
