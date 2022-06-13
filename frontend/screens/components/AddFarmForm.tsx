import * as React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik, FormikValues } from "formik";
import { doc, setDoc } from "firebase/firestore";
import * as yup from "yup";

import { db } from "../../config/firebase";
import { firestore } from "../../utils/firebase";
import { form } from "../../utils/styles";
import { Farm } from "../types";

//https://stackoverflow.com/a/53210158/9377904
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const farm_data_validation_schema = yup.object().shape({
    name: yup.string().required("name required"),
    displayName: yup.string().required("display name required"),
    phone: yup.string().matches(phoneRegExp, "phone number not valid"),
    openHours: yup.string(),
});

export default function AddFarmForm({ back }: { back: Function }) {
    async function add_farm(values: Farm) {
        if (await firestore.doc_exists("farms", values.name)) {
            throw "farm already exists";
        }

        await setDoc(doc(db, "farms", values.name), { ...values });
    }

    function handle_submit({
        name,
        displayName,
        phone,
        openHours,
    }: FormikValues) {
        add_farm({ name, displayName, phone, openHours })
            .then(() => {
                back();
                console.log("farm added");
            })
            .catch((err) => console.error(err));
    }

    return (
        <Formik
            validationSchema={farm_data_validation_schema}
            initialValues={{
                displayName: "",
                name: "",
                phone: "",
                openHours: "",
            }}
            onSubmit={handle_submit}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
            }) => (
                <View>
                    <TextInput
                        placeholder="name"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        style={[form.input]}
                    />
                    {errors.name && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                            {errors.name}
                        </Text>
                    )}
                    <TextInput
                        placeholder="display name"
                        onChangeText={handleChange("displayName")}
                        onBlur={handleBlur("displayName")}
                        value={values.displayName}
                        style={[form.input]}
                    />
                    {errors.displayName && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                            {errors.displayName}
                        </Text>
                    )}
                    <TextInput
                        placeholder="phone number"
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                        style={[form.input]}
                    />
                    {errors.phone && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                            {errors.phone}
                        </Text>
                    )}
                    <TextInput
                        placeholder="open hours"
                        onChangeText={handleChange("openHours")}
                        onBlur={handleBlur("openHours")}
                        value={values.openHours}
                        style={[form.input]}
                    />
                    <Button onPress={() => handleSubmit()} title="Submit" />
                    <Button onPress={() => back()} title="cancel" />
                </View>
            )}
        </Formik>
    );
}
