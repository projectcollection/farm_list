import * as React from "react";

import { useAuth } from "../utils/hooks/useAuth";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

export default function RootNavigation() {
    const { user } = useAuth();

    return user ? <MainStack /> : <AuthStack />;
}
