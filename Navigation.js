import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "./components/Common/Login";
import { AddService } from "./screens/Mentor/AddService";
import { ViewServices } from "./screens/Mentor/ViewServices";
import { ViewService } from "./screens/Mentor/ViewService";
import { EditService } from "./screens/Mentor/EditService";
import { ViewMentorsServices } from "./screens/Client/ViewMentorsServices";
import AddContent from "./screens/Content/AddContent";
import ViewContentList from "./screens/Content/ViewContentList";
import CreateAppointment from "./screens/Client/createAppointment";
import BookedAppointment from "./screens/Client/bookedAppointment";
import UpdateAppointment from "./screens/Client/updateAppointment";
import ViewAppointment from "./screens/Mentor/viewAppointment";
import ViewAppointmentList from "./screens/Mentor/viewAppointmentList";
import BookedAppointmentList from "./screens/Client/bookedAppointmentList";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="booked-appointment-list"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Login" component={ViewAppointment} />

        {/* Mentor */}
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="ViewServices" component={ViewServices} />
        <Stack.Screen name="ViewServiceScreen" component={ViewService} />
        <Stack.Screen name="EditServiceScreen" component={EditService} />
        <Stack.Screen name="ViewAppointment" component={ViewAppointment} />
        <Stack.Screen
          name="ViewAppointmentList"
          component={ViewAppointmentList}
        />

        {/* Client */}
        <Stack.Screen
          name="ViewMentorsServicesScreen"
          component={ViewMentorsServices}
        />
        <Stack.Screen name="create-appointment" component={CreateAppointment} />
        <Stack.Screen name="booked-appointment" component={BookedAppointment} />
        <Stack.Screen name="update-appointment" component={UpdateAppointment} />
        <Stack.Screen
          name="booked-appointment-list"
          component={BookedAppointmentList}
        />

        {/* Content */}
        <Stack.Screen name="AddContent" component={AddContent} />
        <Stack.Screen name="ViewContentList" component={ViewContentList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
