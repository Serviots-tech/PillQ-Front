import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { HideEyeIcon, ShowEyeIcon } from '../../constants/svgs';
import styles from './style';

interface PasswordInputProps {
    fieldName: string
    label: string;
    value: string;
    onChangeText: any;
    onBlur: any;
    errors?: string;
    touched?: boolean;
    placeholder?: string;
    style?: ViewStyle;
    placeholderTextColor?: string;
    isDisable?: boolean
}

export const CustomPasswordInput: React.FC<PasswordInputProps> = ({
    label,
    fieldName,
    value,
    onChangeText,
    onBlur,
    errors,
    touched,
    placeholder = "Enter your password",
    style,
    isDisable = false,
    placeholderTextColor = 'lightgray'
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>{label}</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[
                        styles.inputPassword,
                        touched && errors ? styles.inputError : null,
                        isDisable ? styles.inputDisabled : null
                    ]}
                    placeholder={placeholder}
                    onChangeText={isDisable ? null : onChangeText(fieldName)}
                    onBlur={isDisable ? null : onBlur(fieldName)}
                    value={value}
                    secureTextEntry={!isPasswordVisible}
                    placeholderTextColor={placeholderTextColor}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}  // Toggle password visibility
                >
                    {isPasswordVisible ? <ShowEyeIcon /> : <HideEyeIcon />}
                </TouchableOpacity>
            </View>
            {touched && errors && <Text style={styles.error}>{errors}</Text>}
        </View>
    );
};