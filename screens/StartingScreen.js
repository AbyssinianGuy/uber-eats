import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import LottieView from 'lottie-react-native'
import { Button } from 'react-native-elements'


export default function StartingScreen({ navigation }) {
    return (
        // This is the starting screen of the app
        <View
            style={{
                backgroundColor: "#eee",
                justifyContent: "center"
            }}
        >
            {/* Should have the animation starting_screen.json and two big buttons that say signup and login */}

            <LottieView
                style={{
                    height: 400,
                    alignSelf: "center",
                    marginBottom: 30,
                    borderRadius: 100
                }}
                source={require("../assets/animations/welcome.json")}
                autoPlay
                speed={0.5}
                loop={true}
            />
            <View
                style={{
                    backgroundColor: "",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10
                }}
            >
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10
                }}> Hungry? We've got you!
                </Text>
            </View>
            {/* instead of using buttons use TouchableOpacity components */}
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                backgroundColor: "#fff"
            }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: "#4a6cd1",
                        padding: 30,
                        flex: 1,
                    }}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10,
                        color: "#fff"
                    }}>Signup 🍔
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#0d151d",
                        padding: 30,
                        flex: 1,
                    }}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10,
                        paddingRight: 10,
                        color: "#fff"
                    }}> Login 🍕
                    </Text>
                </TouchableOpacity>
            </View>
            <LottieView
                style={{
                    height: 200,
                    alignSelf: "center",
                    marginBottom: 30,
                    backgroundColor: "#eee",
                    borderRadius: 100
                }}
                source={require("../assets/animations/welcome-3.json")}
                autoPlay
                speed={0.5}
                loop={true}
            />
        </View>

    )
}