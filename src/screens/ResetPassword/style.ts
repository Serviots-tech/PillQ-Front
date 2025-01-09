import { StyleSheet, Dimensions } from "react-native";
import { horizontalScale, verticalScale, moderateScale } from "../../styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: horizontalScale(20),
    backgroundColor: "#F8F9FA",
    justifyContent: "space-between",
  },
  backIcon: {
    marginBottom: verticalScale(10),
  },
  backBtn: {
    fontSize: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(34),
    marginBottom: verticalScale(8),
    fontFamily: "Nunito-Bold",
  },
  subtitle: {
    fontSize: moderateScale(18),
    marginBottom: verticalScale(20),
    color: "#6b6b6b",
    fontFamily: "Nunito-semiBold",
  },
  emailHighlight: {
    fontWeight: "600",
    color: "#333",
  },
  resendText: {
    marginVertical: verticalScale(10),
    textAlign: "center",
    color: "#6b6b6b",
  },
  resendLink: {
    color: "#00bfa5",
    fontWeight: "700",
  },
  button: {
    width: horizontalScale(332),
    height: SCREEN_WIDTH < 768 ? verticalScale(48) : verticalScale(44),
    borderRadius: moderateScale(54),
    marginVertical: verticalScale(16),
    backgroundColor: '#00a8a8',

  },
  buttonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: moderateScale(20),
    paddingVertical: verticalScale(9),
    textAlign: 'center',
    color: '#ffff'
  },
});