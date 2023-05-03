import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItem, { localRestaurants } from '../components/home/RestaurantItem'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import LottieView from 'lottie-react-native'

const YELP_API_KEY = "z0_ctSoBhgsZSfvKJgLK0rkVhV6z55zgHFltHpWKwXkMiqAOr_GNzOTLrLtLO8Y4XMmwPhyOnwcEj8FVy6HD_uB4dgoh2MzOUv2oBcpb9SBcJmuDRDIHBAPFyEdLZHYx"


export default function Home({ navigation }) {
    const [restaurantsData, setRestaurantsData] = useState(localRestaurants)
    const [city, setCity] = useState("Washingtondc")
    const [activeTab, setActiveTab] = useState("Delivery")
    const [loading, setLoading] = useState(false)

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
    // create a function that starts the app starting animation
    const startApp = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }


    useEffect(() => {
        startApp()
        getRestaurantsFromYelp()
    }, [city, activeTab])
    return (
        <>
            {loading ?
                (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LottieView
                        style={{ height: 200, alignSelf: "center" }}
                        source={require("../assets/animations/starting_screen.json")}
                        autoPlay
                        speed={1.0}
                    />
                </View>) :
                (<>
                    <SafeAreaView style={{ backgroundColor: "#ddd", flex: 1 }}>
                        <View style={{ backgroundColor: "white", padding: 15 }}>
                            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                            <SearchBar cityHandler={setCity} />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Categories />
                            <RestaurantItem restaurantsData={restaurantsData} navigation={navigation} />
                        </ScrollView>
                        <Divider width={1} />
                        <BottomTabs />
                    </SafeAreaView>
                </>)
            }
        </>
    )
}