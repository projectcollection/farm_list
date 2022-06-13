import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum AuthStackRoute {
    SignIn = "signIn",
    SignUp = "signUp",
}

export enum MainStackRoute {
    Main = "main",
    AddFarm = "addFarm",
}

//https://reactnavigation.org/docs/typescript/
export type AuthStackParamList = {
    [AuthStackRoute.SignIn]: undefined;
    [AuthStackRoute.SignUp]: undefined;
};

export type MainStackParamList = {
    [MainStackRoute.Main]: undefined;
    [MainStackRoute.AddFarm]: undefined;
};

export type SignInProps = NativeStackScreenProps<
    AuthStackParamList,
    AuthStackRoute.SignIn
>;
export type SignUpProps = NativeStackScreenProps<
    AuthStackParamList,
    AuthStackRoute.SignUp
>;

export type MainProps = NativeStackScreenProps<
    MainStackParamList,
    MainStackRoute.Main
>;
export type AddFarmProps = NativeStackScreenProps<
    MainStackParamList,
    MainStackRoute.AddFarm
>;
