import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import HeaderTabs from '../components/HeaderTabs'
import SearchBar from '../components/SearchBar'
import Categories from '../components/Categories'
import RestaurantItem, { localRestaurants } from '../components/RestaurantItem'

const YELP_API_KEY = "z0_ctSoBhgsZSfvKJgLK0rkVhV6z55zgHFltHpWKwXkMiqAOr_GNzOTLrLtLO8Y4XMmwPhyOnwcEj8FVy6HD_uB4dgoh2MzOUv2oBcpb9SBcJmuDRDIHBAPFyEdLZHYx"


export default function Home() {
    const [restaurantsData, setRestaurantsData] = useState(localRestaurants)
    const [city, setCity] = useState("Washingtondc")
    const [activeTab, setActiveTab] = useState("Delivery")

    const getRestaurantsFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`
        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        }
        return fetch(yelpUrl, apiOptions)
            .then((res) => res.json())
            .then((json) => setRestaurantsData(json.businesses.filter((business) => business.transactions.includes(activeTab.toLowerCase()))))
    }

    useEffect(() => {
        getRestaurantsFromYelp()
    }, [city, activeTab])
    return (
        <SafeAreaView style={{ backgroundColor: "#ddd", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandler={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                <RestaurantItem restaurantsData={restaurantsData} />

            </ScrollView>
        </SafeAreaView>
    )
}