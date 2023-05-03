import { View } from 'react-native'
import React from 'react'

const groceryItems = [
    {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image: "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg"
    },
    {
        title: "Tandoori Chicken",
        description: "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
        price: "$19.20",
        image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg"
    },
    {
        title: "Chilaquiles",
        description: "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
        price: "$14.50",
        image: "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg"
    },
    {
        title: "Chicken Caesar Salad",
        description: "One can never go wrong with a chicken caesar salad.",
        price: "$21.50",
        image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg"
    },

]

export default function GroceryDetail({ route, navigation }) {
    return (
        <View>
            {/* <About route={route} /> */}
            {/* <Divider width={1.8} style={{ marginVertical: 20 }} /> */}
            {/* <MenuItems restaurantName={route.params.name} foods={groceryItems} /> */}
            {/* <ViewCart navigation={navigation} /> */}
        </View>
    )
}