import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Test } from "./screens/Test";
import { Test2 } from "./screens/Test2";
import LoginForm from "./components/Common/Login";
import { AddService } from "./screens/Mentor/AddService";
import { ViewServices } from "./screens/Mentor/ViewServices";
import { ViewService } from "./screens/Mentor/ViewService";
import { EditService } from "./screens/Mentor/EditService";
import { ViewMentorsServices } from "./screens/Client/ViewMentorsServices";
import AddContent from "./screens/Content/AddContent";
import ViewContentList from "./screens/Content/ViewContentList";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AddService"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Test1" component={Test} />
        <Stack.Screen name="Test2" component={Test2} />
        <Stack.Screen name="Login" component={LoginForm} />

        {/* Mentor */}
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="ViewServices" component={ViewServices} />
        <Stack.Screen name="ViewServiceScreen" component={ViewService} />
        <Stack.Screen name="EditServiceScreen" component={EditService} />

        {/* Client */}
        <Stack.Screen
          name="ViewMentorsServicesScreen"
          component={ViewMentorsServices}
        />

        {/* Content */}
        <Stack.Screen name="AddContent" component={AddContent} />
        <Stack.Screen name="ViewContentList" component={ViewContentList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
