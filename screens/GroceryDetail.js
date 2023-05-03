import { View } from 'react-native'
import React from 'react'
import About from '../components/restaurantDetail/About'
import { Divider } from 'react-native-elements'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'

const groceryItems = [
    {
        title: "Organic Bananas",
        price: "$2.99",
        description: "Fresh organic bananas from Ecuador",
        image: "https://i5.walmartimages.com/asr/4b15d1c6-03e7-489b-96cb-7d4b1edeb927.042464e5bc52fa0421f255d04ec525a4.jpeg"
    },
    {
        title: "Organic Apples",
        description: "Fresh organic apples from Washington",
        price: "$3.99",
        image: "https://m.media-amazon.com/images/I/61bzznd+n+L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Organic Grapes",
        description: "Fresh organic grapes from California",
        price: "$4.99",
        image: "https://www.organicproducenetwork.com/uploads/DSC_4329.jpg"
    },
    {
        title: "Organic Pears",
        description: "Fresh organic pears from Oregon",
        price: "$5.99",
        image: "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/7781090/0953a3c5f55406b02c6747fce99bed6c_large.png&width=512&type=webp&quality=90"
    },
    {
        title: "Organic Oranges",
        description: "Fresh organic oranges from Florida",
        price: "$6.99",
        image: "https://cdn.shopify.com/s/files/1/0260/2057/files/oranges_grande.jpg?7530"

    }

]

export default function GroceryDetail({ route, navigation }) {
    return (
        <View>
            <About route={route} />
            <Divider width={1.8} style={{ marginVertical: 20 }} />
            <MenuItems restaurantName={route.params.name} foods={groceryItems} />
            <ViewCart navigation={navigation} />
        </View>
    )
}