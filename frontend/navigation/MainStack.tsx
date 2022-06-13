import * as React from "react";

import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Main, AddFarm } from "../screens";
import { MainStackRoute } from "./types";

const Stack = createNativeStackNavigator();

const linking: LinkingOptions<any> = {
    enabled: true,
    prefixes: ["http://localhost:19006/"],
};

export default function MainStack() {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName={MainStackRoute.Main}>
                <Stack.Screen name={MainStackRoute.Main} component={Main} />
                <Stack.Screen
                    name={MainStackRoute.AddFarm}
                    component={AddFarm}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
