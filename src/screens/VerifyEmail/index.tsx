import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./style"; // Adjust the path as per your project structure
import CustomButton from "../../components/customButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation/AuthStack";
import { retrieveData } from "../../helpers/asyncStorageHelpers";
import { postApi } from "../../apis/apis";

const VerifyEmail: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // Adjusted for 6 digits
  const inputRefs = useRef<TextInput[]>([]);
  const [email, setEmail] = useState<string>("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await fetchAsyncStorageData();
        if (email) {
          setEmail(email.toString());
        }
      } catch (error) {
        console.error("Error fetching email from AsyncStorage:", error);
      }
    };

    getEmail();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setIsResendDisabled(false);
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isResendDisabled, timer]);

  const fetchAsyncStorageData = async () => {
    const registerEmail = await retrieveData("registerEmail");
    return registerEmail;
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!isResendDisabled) {
      console.log("Resending OTP...");
      setIsResendDisabled(true);
      setTimer(180); // Reset the timer to 3 minutes
    }
  };

  const handleVerify = async () => {
    console.log("OTP Entered: ", otp.join(""));
    const otpString = otp.join("");
    console.log("🚀 ~ email:", email);
    if (otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      // display error message
      return;
    }

    setIsLoading(true);
    try {
      await postApi("/auth/registration-otp-verification", { otp: otpString, email: email });
      console.log("Success");
    } catch (error: any) {
      console.log("🚀 ~ registerUser ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <View>
          <View style={styles.backicon}>
            <CustomButton label={"back-icon"} onPress={() => navigation.goBack()} isIcon={true} />
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>We have sent an OTP to {email}</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Enter OTP:</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref!)}
                  style={[styles.input, { width: 40, textAlign: "center" }]} // Adjust width if needed
                  keyboardType="numeric"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(value, index);
                    }
                  }}
                />
              ))}
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleResend} disabled={isResendDisabled}>
            <Text style={styles.footer}>
              Don't receive the OTP?{" "}
              <Text style={styles.link}>
                {isResendDisabled ? `Resend in ${Math.floor(timer / 60)}:${timer % 60}` : "Click to Resend"}
              </Text>
            </Text>
          </TouchableOpacity>

          <CustomButton
            onPress={handleVerify}
            label={"Verify Email"}
            buttonTextStyle={styles.buttonText}
            viewStyle={styles.button}
          />
        </View>
      </View>
    </>
  );
};

export default VerifyEmail;
