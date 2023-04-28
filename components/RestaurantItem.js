import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MateiralCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function RestaurantItem() {
    return (
        <TouchableOpacity activeOpacity={1} style={{ marginBottom: 30 }}>
            <View style={{ marginTop: 10, padding: 15, backgroundColor: "#fff" }}>
                {/* restaurant image */}
                <RestaurantImage />
                {/* restaurant info */}
                <RestaurantInfo />
            </View>
        </TouchableOpacity>
    )
}

const RestaurantImage = () => (
    <>
        <Image source={{ uri: "https://media.disneylandparis.com/d4th/en-usd/images/n035297_2024jun02_world_downtown-restaurant-disney-hotel-new-york-the-art-of-marvel_16-9_tcm1861-254897.jpg" }}
            style={{
                width: "100%",
                height: 180
            }}
        />
        <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
            {/* name of MateiralCommunityIcons has been changed to MateiralCommunityIcon */}
            <MateiralCommunityIcon
                name="heart-outline"
                size={25}
                style={{
                    color: "#fff",
                    position: "absolute",
                    top: 20,
                    right: 20,
                    zIndex: 5
                }}

            />
        </TouchableOpacity>
    </>
)

const RestaurantInfo = () => (
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
        }}
    >
        <View >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Farmhouse Kitchen Thai Cuisine</Text>
            <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
        </View>
        <View style={{
            backgroundColor: "#ddd",
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
        }}
        >
            <Text>4.5</Text>
        </View>
    </View >
)