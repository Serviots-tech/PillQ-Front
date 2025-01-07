import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Keyboard, TouchableOpacity } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/customButton";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';
import { postApi } from "../../apis/apis";
import { RootStackParamList } from "../../Navigation/AuthStack";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DividerWithText from "../../components/DividerWithText/DividerWithText";
import { navigationStrings } from "../../constants/navigationStrings";
import { storeData } from "../../helpers/asyncStorageHelpers";
import { CustomInputField } from "../../components/customInputField";
import { CustomPasswordInput } from "../../components/customPasswordField";

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Please enter your name"),
    email: Yup.string().trim().email("Invalid email").required("Please enter a valid email address"),
    phone: Yup.string().trim()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Please enter phone number"),
    password: Yup.string()
        .min(8, "Password must include at least one uppercase letter, one lowercase letter, one number, and be alphanumeric with special characters (@, $, !, %, *, ?, &).").
        max(16, "Password must include at least one uppercase letter, one lowercase letter, one number, and be alphanumeric with special characters (@, $, !, %, *, ?, &).")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one number, and be alphanumeric with special characters (@, $, !, %, *, ?, &)."
        )
        .required("Please enter your password"),
    confirmPassword: Yup.string().trim()
        .nullable()
        .oneOf([Yup.ref("password")], "Passwords do not match. Please try again")
        .required("Please confirm your password"),
});

const SignUp: React.FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [isLoading, setIsLoading] = useState(false)
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const initialValues: FormValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    };

    const registerUser = async (values: FormValues) => {

        setIsLoading(true)
        try {
            const { confirmPassword, phone, ...rest } = values
            await storeData('registerEmail', values?.email?.toLowerCase())
            const data = await postApi('/auth/register', { ...rest, phoneNumber: phone })
            navigation.navigate(navigationStrings.VERIFY_EMAIL)
        }
        catch (error: any) {
            console.log("🚀 ~ registerUser ~ error:", JSON.stringify(error))
        }
        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    return (<>
        <SafeAreaView></SafeAreaView>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: keyboardVisible ? 250 : 0 }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        await registerUser(values)
                        resetForm();
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }: FormikProps<FormValues>) => (

                        <View style={styles.container}>
                            <View>
                                <View style={styles.backicon}>
                                    <CustomButton label={"back-icon"} onPress={() => { navigation.navigate(navigationStrings.WELCOME); }} isIcon={true} />
                                </View>
                                <View style={styles.titletext}>
                                    <Text style={styles.title}>Create an account</Text>
                                    <Text style={styles.subtitle}>Welcome! Please enter your details</Text>
                                </View>
                                <CustomInputField
                                    fieldName="name"
                                    label="Name"
                                    value={values.name}
                                    onChangeText={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.name}
                                    errors={errors.name}
                                    placeholder="Enter your name"
                                // isDisable={true}
                                />

                                <CustomInputField
                                    fieldName="email"
                                    label="Email"
                                    value={values.email}
                                    onChangeText={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.email}
                                    errors={errors.email}
                                    placeholder="Enter your email"
                                />

                                <CustomInputField
                                    fieldName="phone"
                                    label="Phone"
                                    value={values.phone}
                                    onChangeText={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.phone}
                                    errors={errors.phone}
                                    placeholder="Enter your phone number"
                                />
                                <CustomPasswordInput
                                    fieldName="password"
                                    label="Password"
                                    value={values.password}
                                    onChangeText={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.password}
                                    errors={errors.password}
                                    placeholder="Enter your password"
                                />

                                <CustomPasswordInput
                                    fieldName="confirmPassword"
                                    label="Confirm Password"
                                    value={values.confirmPassword}
                                    onChangeText={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.confirmPassword}
                                    errors={errors.confirmPassword}
                                    placeholder="Confirm your password"
                                />
                            </View>
                            <View>
                                <CustomButton onPress={handleSubmit} label={"Sign Up"} buttonTextStyle={styles.buttonText} viewStyle={styles.button} isLoading={isLoading} />
                                <View style={styles.dividertext}>
                                    <DividerWithText color={'#333333'} />
                                </View>
                                <Text style={styles.footer} onPress={() => {
                                    navigation.navigate(navigationStrings.LOGIN);
                                }}>
                                    Already have an account? <Text style={styles.link}>Log in</Text>
                                </Text>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    </>
    );
};

export default SignUp;
