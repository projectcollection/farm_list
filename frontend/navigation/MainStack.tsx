import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Main } from "../screens";
import { MainStackRoute } from "./types";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={MainStackRoute.Main}>
                <Stack.Screen name={MainStackRoute.Main} component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
