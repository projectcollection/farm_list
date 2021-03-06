import * as yup from "yup";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Main from "./Main";
import AddFarm from "./AddFarm";

const auth_validation_schema = yup.object().shape({
    email: yup.string().email("enter valid email").required("email required"),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be ${min} characters`)
        .required("password required"),
});

export { SignIn, SignUp, Main, AddFarm, auth_validation_schema };
