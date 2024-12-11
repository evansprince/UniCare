import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/signIn';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/login';
import Messages from '../components/Messages';
import FAQs from '../components/FAQS';
import Settings from '../components/Settings';
import CallForHelp from '../components/CallForHelp';
import EmergencyContacts from '../components/EmergenceContacts';
import MedicalHistory from '../components/MedicalHistory';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="CallForHelp" component={CallForHelp} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
