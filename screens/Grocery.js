import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import BottomTabs from '../components/home/BottomTabs'
import GroceryItem, { localStores } from '../components/home/GroceryItem'
import Categories from '../components/home/Categories'
import axios from 'axios'

YELP_API_KEY = "z0_ctSoBhgsZSfvKJgLK0rkVhV6z55zgHFltHpWKwXkMiqAOr_GNzOTLrLtLO8Y4XMmwPhyOnwcEj8FVy6HD_uB4dgoh2MzOUv2oBcpb9SBcJmuDRDIHBAPFyEdLZHYx"
GOOGLE_API_KEY = "AIzaSyDZIVArpw23ZqN2LA_JPOQisNaGJoElk5E"


export default function Grocery({ navigation }) {

    const [storeData, setStoreData] = useState(localStores) // create localStores in a file GroceryItem.js
    const [city, setCity] = useState("Washingtondc")
    const [activeTab, setActiveTab] = useState("Delivery")
    const [coordinates, setCoordinates] = useState('33.7490,-84.3880')
    const [photo_url, setPhoto_url] = useState('https://lh3.googleusercontent.com/places/AJQcZqLXoCHmPcKOn6PCSgHhFvtsldJ6Dny32PBHbNSdEn76jimMhkxExsHuWV-h0hlmK6Q-JHZ9F_6ZojrHiqfPQVZ_v_bCejAx5-U=s1600-w400')

    const geocodeCity = async (cityName) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: cityName,
                    key: GOOGLE_API_KEY,
                },
            });
            const location = response.data.results[0].geometry.location;
            setCoordinates(`${location.lat},${location.lng}`)
            // console.log('Location:', coordinates);
        } catch (error) {
            console.error('Error geocoding city:', error);
        }
    };
    const getPhotoUrl = (photoReference) => {
        const ref = photoReference[0].photos[0].photo_reference
        setPhoto_url(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${GOOGLE_API_KEY}`)
    };

    const getShoppingStores = async (location = coordinates, keyword = 'grocery') => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: location,
                    radius: 5000, // adjust the radius (in meters) as needed
                    keyword: keyword,
                    type: 'store',
                    key: GOOGLE_API_KEY,
                },
            })
            setStoreData(response.data.results);
        } catch (error) {
            console.error('Error fetching shopping stores:', error);
        }
    };
    // console.log(storeData[0])
    // console.log(photo_url)

    useEffect(() => {
        geocodeCity(city)
        getShoppingStores(coordinates)
        // loop through storeData and get the names
        {
            storeData.map((store, index) => (
                console.log(store.name, store.rating, store.vicinity)
            )
            )
        }
        // console.log(storeData[0].name)
        // getPhotoUrl(storeData)

    }, [city, coordinates, activeTab])


    return (
        <SafeAreaView style={{ backgroundColor: "#ddd", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandler={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                {/* <>{
                    storeData.map((store, index) => (
                        <Text key={index}>{store.name}</Text>
                    )
                    )
                }
                </> */}
                {/* <GroceryItem storeData={storeData} navigation={navigation} /> */}
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </SafeAreaView>
    )
}