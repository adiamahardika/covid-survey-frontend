import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainPage from "./src/components/MainPage";
import DetailPage from "./src/components/DetailPage";
import AddDataPage from "./src/components/AddDataPage";
import AuthPage from "./src/components/AuthPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={AuthPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Survey Covid" component={MainPage} />
        <Stack.Screen name="Detail" component={DetailPage} />
        <Stack.Screen name="Form" component={AddDataPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
