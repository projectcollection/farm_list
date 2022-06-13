import * as React from "react";

import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn, SignUp } from "../screens";
import { AuthStackParamList, AuthStackRoute } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const linking: LinkingOptions<any> = {
    enabled: true,
    prefixes: ["http://localhost:19006/"],
};

export default function AuthStack() {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName={AuthStackRoute.SignIn}>
                <Stack.Screen name={AuthStackRoute.SignIn} component={SignIn} />
                <Stack.Screen name={AuthStackRoute.SignUp} component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
