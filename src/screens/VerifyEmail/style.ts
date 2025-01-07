import { Dimensions, StyleSheet } from "react-native";
import SCALE, { horizontalScale, isSmallDevice, moderateScale, verticalScale } from "../../styles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
        justifyContent: "space-between",
    },
    backicon: {
        marginBottom: 12,
    },
    backBtn: {
        fontSize: 17
    },
    titletext: {
        marginBottom: 10,
    },
    title: {
        fontSize: 34,
        marginBottom: 8,
        fontFamily: "Nunito-Bold",
    },
    subtitle: {
        fontSize: 17,
        marginBottom: 2,
        fontWeight:500,
        color: "#6b6b6b",
        fontFamily: "Nunito-SemiBold",
    },
    fieldContainer: {
        marginBottom: 10,
        marginTop:'5%'
    },
    fieldTitle: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#333333",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        marginTop:'5%',
        color:'#00A8A8',
        fontWeight: 'bold',
        fontSize:24
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    },
    button: {
        width: horizontalScale(332),
        height: SCREEN_WIDTH < 768 ? verticalScale(48) : verticalScale(44),
        borderRadius: moderateScale(54),
        marginVertical: verticalScale(16),
        backgroundColor: "#00a8a8",
    },
    buttonText: {
        fontFamily: "Nunito-SemiBold",
        fontSize: moderateScale(20),
        paddingVertical: verticalScale(9),
        textAlign: "center",
        color: "#fff",
    },
    footer: {
        marginTop: '5%',
        textAlign: "center",
        fontSize:18,
        color: "#333333",
        marginBottom:'1.5%',
        fontFamily: "Nunito-SemiBold",
    },
    link: {
        color: "#00bfa5",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Nunito-Bold",
        
    },
      disabledLink: {
        color: "#9FA2A4",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 18,
      },
});

export default styles;
