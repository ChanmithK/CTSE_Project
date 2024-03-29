import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import ViewContent from "./screens/Content/ViewContent";
import MyContentList from "./screens/Content/MyContentList";
import UpdateContent from "./screens/Content/UpdateContent";
import InitialPage from "./screens/Common/InitialPage";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreenUser from "./screens/RegisterScreenUser";
import RegisterMentor from "./screens/RegisterMentor";
import MentorProfile from "./screens/Mentor/MentorProfile";
import MentorProfileUpdate from "./screens/Mentor/MentorProfileUpdate";
import ClientHome from "./components/Client/ClientHome";
import MentorMenu from "./components/Mentor/MentorMenu";
import ClientMenu from "./components/Client/ClientMenu";
import PendingContentList from "./screens/Admin/PendingContentList";
import ViewPendingContent from "./screens/Admin/ViewPendingContent";
import ClientProfile from "./screens/Client/ClientProfile";
import ClientProfileUpdate from "./screens/Client/ClientProfileUpdate";
import { ViewMentorService } from "./screens/Client/viewMentorService";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={screenOptions}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="registerUser" component={RegisterScreenUser} />
        <Stack.Screen name="registerMentor" component={RegisterMentor} />
        <Stack.Screen name="initialPage" component={InitialPage} />

        {/* Mentor */}
        <Stack.Screen name="viewPending" component={ViewPendingContent} />
        <Stack.Screen name="pendingContent" component={PendingContentList} />
        <Stack.Screen name="mentorProfile" component={MentorProfile} />
        <Stack.Screen
          name="mentorProfileUpdate"
          component={MentorProfileUpdate}
        />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="ViewServices" component={ViewServices} />

        {/* Mentor */}
        <Stack.Screen name="ViewServiceScreen" component={ViewService} />
        <Stack.Screen name="EditServiceScreen" component={EditService} />
        <Stack.Screen name="ViewAppointment" component={ViewAppointment} />
        <Stack.Screen
          name="ViewAppointmentList"
          component={ViewAppointmentList}
        />
        <Stack.Screen name="MentorMenu" component={MentorMenu} />

        {/* Client */}
        <Stack.Screen
          name="clientProfileUpdate"
          component={ClientProfileUpdate}
        />
        <Stack.Screen name="clientProfile" component={ClientProfile} />
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

        <Stack.Screen name="ClientMenu" component={ClientMenu} />
        <Stack.Screen name="ClientHome" component={ClientHome} />

        <Stack.Screen name="viewMentorService" component={ViewMentorService} />

        {/* Content */}
        <Stack.Screen name="AddContent" component={AddContent} />
        <Stack.Screen name="ViewContentList" component={ViewContentList} />
        <Stack.Screen name="ViewContent" component={ViewContent} />
        <Stack.Screen name="MyContentList" component={MyContentList} />
        <Stack.Screen name="UpdateContent" component={UpdateContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
