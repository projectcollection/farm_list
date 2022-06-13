import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn, SignUp } from "../screens";
import { AuthStackParamList, AuthStackRoute } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={AuthStackRoute.SignIn}>
                <Stack.Screen name={AuthStackRoute.SignIn} component={SignIn} />
                <Stack.Screen name={AuthStackRoute.SignUp} component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
