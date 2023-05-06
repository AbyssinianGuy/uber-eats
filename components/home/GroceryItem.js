import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import MateiralCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

GOOGLE_API_KEY = "<Your api key>"

export const localStores = [
    {
        name: "Beachside Bar",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/09/6c/15/08/love-the-food-and-the.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 4.5,
    },
    {
        name: "Benihana",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/0e/11/e7/0a/tilapia-over-creamy-pasta.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 3.7,
    },
    {
        name: "India's Grill",
        image_url: "https://media-cdn.tripadvisor.com/media/photo-s/18/1a/75/c5/photo0jpg.jpg",
        categories: ["Indian", "Bar"],
        price: "$$",
        reviews: 700,
        rating: 4.9,
    },
]

const imageBaseUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=' + GOOGLE_API_KEY;
const defaultImageUrl = 'https://via.placeholder.com/400'; // Add a placeholder image URL as a fallback

export default function GroceryItem({ navigation, ...props }) {

    return (
        <>
            {props.storesData?.map((store, index) => {
                const photoReference = store.photos && store.photos[0]?.photo_reference;
                const imageUrl = photoReference ? `${imageBaseUrl}&photoreference=${photoReference}` : defaultImageUrl;

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        style={{ marginBottom: 30 }}
                        onPress={() =>
                            navigation.navigate("GroceryDetail", {
                                name: store.name,
                                image: imageUrl,
                                price: store.price_level,
                                reviews: store.user_ratings_total,
                                rating: store.rating,
                                categories: store.types,
                            })
                        }
                    >
                        <View
                            style={{ marginTop: 10, padding: 15, backgroundColor: "#fff" }}
                        >
                            {/* store image */}
                            <GroceryImage image={imageUrl} />
                            {/* store info */}
                            <GroceryInfo name={store.name} rating={store.rating} />
                        </View>
                    </TouchableOpacity>
                );
            })
            }
        </>
    )
}

const GroceryImage = (props) => (
    <>
        <Image
            source={{ uri: props.image }}
            style={{ width: "100%", height: 180 }}
        />
        <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
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

const GroceryInfo = (props) => (
    <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
        }}

    >
        <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
            <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
        </View>
        <View style={{
            backgroundColor: "#eee",
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
        }}>
            <Text>{props.rating}</Text>
        </View>
    </View>
)