import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik, FormikValues } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";
import { auth_validation_schema } from "./index";
import { SignUpProps, AuthStackRoute } from "../navigation/types";
import { form } from "../utils/styles";

export default function SignUp({ navigation }: SignUpProps) {
    async function sign_up({ email, password }: FormikValues) {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    return (
        <Formik
            validationSchema={auth_validation_schema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
                sign_up(values)
                    .then(() => {
                        navigation.navigate(AuthStackRoute.SignIn);
                    })
                    .catch((err) => console.error(err));
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
            }) => (
                <View style={[]}>
                    <TextInput
                        placeholder="email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        style={[form.input]}
                    />
                    {errors.email && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                            {errors.email}
                        </Text>
                    )}
                    <TextInput
                        placeholder="password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={true}
                        style={[form.input]}
                    />
                    {errors.password && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                            {errors.password}
                        </Text>
                    )}
                    <Button onPress={() => handleSubmit()} title="Submit" />
                </View>
            )}
        </Formik>
    );
}
