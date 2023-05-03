import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';


export default function BottomTabs() {
    // add onPress to the icons
    const Stack = createStackNavigator();

    const navigation = useNavigation();

    const handleIconPress = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={{
            flexDirection: "row",
            margin: 10,
            marginHorizontal: 30,
            justifyContent: "space-between"
        }}>
            {/* icons and texts */}
            <Icon icon="home" text="Home" onPress={() => handleIconPress("Home")} />
            <Icon icon="search" text="Browse" onPress={() => handleIconPress("Browse")} />
            <Icon icon="shopping-bag" text="Grocery" onPress={() => handleIconPress("Grocery")} />
            <Icon icon="receipt" text="Orders" onPress={() => handleIconPress("Orders")} />
            <Icon icon="user" text="Account" onPress={() => handleIconPress("Account")} />

        </View>
    )
}

const Icon = (props) => (
    <TouchableOpacity
        onPress={props.onPress}
    >
        <View>
            <FontAwesome5
                name={props.icon}
                size={25}
                style={{
                    marginBottom: 3, alignSelf: 'center',
                }}
            />
            <Text>{props.text}</Text>
        </View>
    </TouchableOpacity>
)