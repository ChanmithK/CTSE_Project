import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './components/Common/Login';
import { AddService } from './screens/Mentor/AddService';
import { ViewServices } from './screens/Mentor/ViewServices';
import { ViewService } from './screens/Mentor/ViewService';
import { EditService } from './screens/Mentor/EditService';
import { ViewMentorsServices } from './screens/Client/ViewMentorsServices';
import AddContent from './screens/Content/AddContent';
import ViewContentList from './screens/Content/ViewContentList';
import InitialPage from './screens/Common/InitialPage';
import LoginScreen from './screens/LoginScreen';
import RegisterScreenUser from './screens/RegisterScreenUser';
import RegisterMentor from './screens/RegisterMentor';
import MentorProfile from './screens/Mentor/MentorProfile';

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='InitialPage'
        screenOptions={screenOptions}
      >
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='registerUser' component={RegisterScreenUser} />
        <Stack.Screen name='registerMentor' component={RegisterMentor} />
        <Stack.Screen name='initialPage' component={InitialPage} />

        <Stack.Screen name='Login' component={LoginForm} />

        {/* Mentor */}
        <Stack.Screen name='mentorProfile' component={MentorProfile} />
        <Stack.Screen name='AddService' component={AddService} />
        <Stack.Screen name='ViewServices' component={ViewServices} />
        <Stack.Screen name='ViewServiceScreen' component={ViewService} />
        <Stack.Screen name='EditServiceScreen' component={EditService} />

        {/* Client */}
        <Stack.Screen
          name='ViewMentorsServicesScreen'
          component={ViewMentorsServices}
        />

        {/* Content */}
        <Stack.Screen name='AddContent' component={AddContent} />
        <Stack.Screen name='ViewContentList' component={ViewContentList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
