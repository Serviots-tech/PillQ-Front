
import {  StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 10,
    },
    fieldTitle: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#333333",
        borderRadius: 4,
        padding:10
    },
    input: {
        flex: 1,
        paddingVertical: 0,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    },
    inputError: {
        borderColor: "red",
    },
    inputDisabled: {
        backgroundColor: '#f0f0f0',
        color: '#d3d3d3',
        borderColor: '#d3d3d3',
    },
    icon: {
        marginRight: 10,
    },
});

export default styles;