import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum AuthStackRoute {
    SignIn = "SignIn",
    SignUp = "SignUp",
}

export enum MainStackRoute {
    Main = "Main",
}

//https://reactnavigation.org/docs/typescript/
export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type SignInProps = NativeStackScreenProps<AuthStackParamList, "SignIn">;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;
