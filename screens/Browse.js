import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import BottomTabs from '../components/home/BottomTabs'




export default function Browse(props) {

    // const [city, setCity] = useState("Washingtondc")
    const [activeTab, setActiveTab] = useState("Delivery")

    return (
        <SafeAreaView style={{ backgroundColor: "#ddd", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
                <SearchBar cityHandler={props.setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
            </ScrollView>
            <Divider width={1} />
            <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </SafeAreaView>
    )
}