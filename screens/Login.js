import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'



export default function Login({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // add login logic here
        console.log("username: ", username)
        console.log("password: ", password)
        if (username === "" && password === "") {
            alert("Please enter a username and password")
        }
        else if (username === "") {
            alert("Please enter a username")
        }
        else if (password === "") {
            alert("Please enter a password")
        }
        // check if email contains @
        else if (!username.includes("@")) {
            alert("Please enter a valid username")
        }
        // check if password is at least 8 characters and contains a number and a uppercase letter and a symbol
        else if (password.length < 8) {
            alert("Please enter a password that is at least 8 characters long")
        }
        else if (!password.match(/[A-Z]/)) {
            alert("Please enter a password that contains an uppercase letter")
        }
        else if (!password.match(/[0-9]/)) {
            alert("Please enter a password that contains a number")
        }
        else if (!password.match(/[!@#$%^&*]/)) {
            alert("Please enter a password that contains a symbol")
        }
        else {
            navigation.navigate("Home")
        }
        setUsername("")
        setPassword("")
    }

    return (
        // create a login page that matches the design of the app
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                {/* insert the login.json lattie animation */}
                <LottieView
                    style={{
                        height: 300,
                        alignSelf: "center",
                        marginBottom: 30,
                        // backgroundColor: "#5cb108", 
                        borderRadius: 100
                    }}
                    source={require("../assets/animations/login.json")}
                    autoPlay
                    speed={1}
                    loop={true}
                />
            </View>

            <View style={{ backgroundColor: "white", padding: 15 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                // style={{ flex: 1 }}
                >
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
                        }}>Username:
                        </Text>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 5,
                                width: 200,
                                marginLeft: 10,
                                textAlign: "center",
                            }}
                            onChangeText={setUsername}
                            value={username}
                            placeholder='username'
                            placeholderTextColor={'#aaaaaa'}
                            keyboardType="email-address"

                        />
                    </View>
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
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 5,
                                width: 200,
                                marginLeft: 10,
                                textAlign: "center",
                            }}
                            onChangeText={setPassword}
                            value={password}
                            placeholder='password'
                            placeholderTextColor={'#aaaaaa'}
                            secureTextEntry
                        />
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
                    <Text style={{
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
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>

    )
}