import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import * as Device from 'expo-device'

const deviceType = Device.deviceName === 'iPad' ? "Tablet" : "Phone"


const styles = StyleSheet.create({
    input_error: {
        height: 40,
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        marginLeft: 10,
        textAlign: "center",
    },
    input_success: {
        height: 40,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        marginLeft: 10,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        marginLeft: 10,
        textAlign: "center",
    },
    text_err: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center',
        marginLeft: 10,
        textAlign: "center",
    },
    text_success: {
        color: 'green',
        fontSize: 12,
        alignSelf: 'center',
        marginLeft: 10,
        textAlign: "center",
    },

})

export default function Login({ navigation }) {



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isUsernameTouched, setUsernameTouched] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordTouched, setPasswordTouched] = useState(false);

    const handleLogin = () => {
        // add login logic here
        console.log("username: ", username)
        console.log("password: ", password)
        navigation.navigate("Home")
        setUsername("")
        setPassword("")
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasSymbol = /[!@#$%^&*]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        return hasUppercase && hasSymbol && hasNumber;
    };


    useEffect(() => {
        setIsUsernameValid(validateEmail(username))
    }, [username])

    useEffect(() => {
        if (isUsernameValid)
            setIsPasswordValid(validatePassword(password))
    }, [password])



    return (
        // create a login page that matches the design of the app
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                {/* insert the login.json lattie animation */}
                <LottieView
                    style={{
                        height: deviceType === 'Tablet' ? 400 : 200,
                        alignSelf: "center",
                        marginBottom: 30,
                        borderRadius: 100
                    }}
                    source={require("../assets/animations/login.json")}
                    autoPlay
                    speed={1}
                    loop={true}
                />
            </View>

            <View style={{ backgroundColor: "white", padding: 15 }}>
                <ScrollView>
                    <View style={{
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}>Email:
                        </Text>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                            <TextInput
                                {
                                ...(!isUsernameValid && isUsernameTouched && { style: styles.input_error })
                                }
                                {
                                ...(isUsernameValid && isUsernameTouched && { style: styles.input_success })
                                }
                                {
                                ...(!isUsernameTouched && { style: styles.input })
                                }
                                onChangeText={setUsername}
                                value={username}
                                placeholder='email@example.com'
                                placeholderTextColor={'#aaaaaa'}
                                keyboardType="email-address"
                                onEndEditing={(e) => validateEmail(e.nativeEvent.text)}
                                onBlur={() => setUsernameTouched(true)}

                            />
                            {isUsernameTouched && (
                                <Text style={
                                    !isUsernameValid && isUsernameTouched ? styles.text_err : styles.text_success
                                }
                                >
                                    {
                                        (!isUsernameValid && isUsernameTouched) ?
                                            " 🥴 Please enter a valid email" :
                                            " 😎 email is valid"
                                    }
                                </Text>
                            )}
                        </View>
                    </View>
                    {/* Password section */}
                    {isUsernameValid && (
                        <>
                            <View style={{
                                marginBottom: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}>Password:
                                </Text>
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                >
                                    <TextInput
                                        {
                                        ...(!isPasswordValid && isPasswordTouched && { style: styles.input_error })
                                        }
                                        {
                                        ...(isPasswordValid && isPasswordTouched && { style: styles.input_success })
                                        }
                                        {
                                        ...(!isPasswordTouched && { style: styles.input })
                                        }
                                        onChangeText={setPassword}
                                        value={password}
                                        placeholder='password'
                                        placeholderTextColor={'#aaaaaa'}
                                        secureTextEntry
                                        onEndEditing={(e) => validatePassword(e.nativeEvent.text)}
                                        onBlur={() => setPasswordTouched(true)}
                                    />
                                    {isPasswordTouched && (
                                        <Text style={
                                            !isPasswordValid && isPasswordTouched ? styles.text_err : styles.text_success
                                        }
                                        >
                                            {
                                                (!isPasswordValid && isPasswordTouched) ?
                                                    " 🥴 Please enter a valid password" :
                                                    " 😎 password is valid"
                                            }
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: 10
                            }}>
                                <Text style={{
                                    color: "#e47911",
                                }}>
                                    Forgot Password? &nbsp;
                                </Text>
                            </Text>
                        </>
                    )}
                    {/* Login button */}
                    {isPasswordValid && (
                        <>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#0d151d',
                                    paddingHorizontal: 10,
                                    marginHorizontal: 80,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    alignItems: 'center'
                                }}
                                // onPress should navigate to the home page
                                onPress={() => handleLogin()}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                                >
                                    Login  🙂
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {/* Sign up button */}
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}




{/* {isUsernameValid && (
                        <>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#0d151d',
                                    paddingHorizontal: 10,
                                    marginHorizontal: 80,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    alignItems: 'center'
                                }}
                                // onPress should navigate to the home page
                                onPress={() => handleLogin()}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                                >
                                    Login  🙂
                                </Text>
                            </TouchableOpacity>
                        </>
                    )} */}
{/* <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10,
                        marginTop: 10
                    }}>
                        <Text style={{
                            color: "#e47911",
                        }}>
                            Don't have an account? &nbsp;
                        </Text>
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#4a6cd1',
                            paddingHorizontal: 10,
                            marginHorizontal: 80,
                            paddingVertical: 10,
                            borderRadius: 5,
                            marginTop: 10,
                            alignItems: 'center'
                        }}
                        onPress={() => handleLogin()}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: "center",
                        }}
                        >
                            Sign Up  🥳
                        </Text>
                    </TouchableOpacity> */}