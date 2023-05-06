import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import { ScrollView } from 'react-native-gesture-handler'
import LottieView from 'lottie-react-native'

const profile_info = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phonenumber: "123-456-7890",
    dob: "01/01/2000"
}

export default function Account({ navigation }) {
    const logout_animation = (page, navigation) => {
        return (
            <>
                {
                    page === "Login" ?
                        <>
                            <View>
                                <LottieView
                                    style={{ height: 200, alignSelf: "center", marginBottom: 30, backgroundColor: "#5cb108", borderRadius: 100 }}
                                    source={require("../assets/animations/logout.json")}
                                    autoPlay
                                    speed={0.5}
                                    loop={true}
                                />
                            </View>
                            {navigation.navigate(page)}
                        </> : <></>
                }
            </>
        )
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#ddd", flex: 1 }}>
            <View style={{ backgroundColor: "#ddd", padding: 15, alignItems: 'center' }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold"
                }}>
                    Profile
                </Text>
            </View>
            <Divider width={1} />
            <View style={{ backgroundColor: "#ddd", padding: 15 }}>
                <LottieView
                    style={{ height: 200, alignSelf: "center", marginBottom: -25, backgroundColor: "#ddd", borderRadius: 100 }}
                    source={require("../assets/animations/profile.json")}
                    autoPlay
                    speed={0.5}
                    loop={true}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: "#ddd", padding: 15 }}
            >
                <View style={{ backgroundColor: "#E5D9B6", padding: 15, borderRadius: 30, flex: 1, alignItems: "stretch" }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10
                    }}>Name: &nbsp;
                        <Text style={{
                            color: "#e47911",
                        }}>
                            {profile_info.name} &nbsp;
                        </Text>
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10
                    }}>Email: &nbsp;
                        <Text style={{
                            color: "#e47911",
                        }}>
                            {profile_info.email} &nbsp;
                        </Text>
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10
                    }}>Phone Number: &nbsp;
                        <Text style={{
                            color: "#e47911",
                        }}>
                            {profile_info.phonenumber} &nbsp;
                        </Text>
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10
                    }}>Date of Birth: &nbsp;
                        <Text style={{
                            color: "#e47911",
                        }}>
                            {profile_info.dob} &nbsp;
                        </Text>
                    </Text>
                </View>
                <Divider />
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 15,
                    flexDirection: "column",
                    padding: 15,
                    borderRadius: 30
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10
                    }}>Account Information</Text>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate("EditProfile")}
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10
                        }}>Payment Methods</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={() => navigation.navigate("EditProfile")}
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10
                        }}>Notifications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10
                        }}>Rewards & Gift Cards</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10
                        }}>Contact Support</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10
                        }}>Privacy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10
                        }}>About Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            backgroundColor: "#f0f0f0",
                            padding: 10,
                            borderRadius: 10
                        }}>Legal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => logout_animation("Login", navigation)}
                        style={{
                            backgroundColor: "#5cb108",
                            width: "100%",
                            padding: 10,
                            borderRadius: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10
                        }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </SafeAreaView>
    )
}
