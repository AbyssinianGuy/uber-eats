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
    const [city, setCity] = useState("Alexandria")
    const [activeTab, setActiveTab] = useState("Delivery")

    // const getStoresFromYelp = () => {
    //     const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=shopping&location=${city}`
    //     const apiOptions = {
    //         headers: {
    //             Authorization: `Bearer ${YELP_API_KEY}`,
    //         },
    //     }
    //     return fetch(yelpUrl, apiOptions)
    //         .then((res) => res.json())
    //         .then((json) => setStoreData(json.businesses.filter((business) => business.transactions.includes(activeTab.toLowerCase()))))
    // }

    // getstores from google places api
    // const getStoresFromGoogle = () => {
    //     const googleUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${city}&radius=1500&keyword=restaurants&key=${GOOGLE_API_KEY}`
    //     return fetch(googleUrl)
    //         .then((res) => res.json())
    //         .then((json) => setStoreData(json.results))
    // }

    // console.log(storeData)
    const getShoppingStores = async (location, keyword = 'grocery') => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: location,
                    radius: 5000, // adjust the radius (in meters) as needed
                    keyword: keyword,
                    type: 'store',
                    key: GOOGLE_API_KEY,
                },
            });

            setStoreData(response.data.results);
        } catch (error) {
            console.error('Error fetching shopping stores:', error);
        }
    };
    console.log(storeData)
    useEffect(() => {
        // getStoresFromYelp()
        // getStoresFromGoogle()
        getShoppingStores('37.7749,-122.4194')
    }, [city, activeTab])


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