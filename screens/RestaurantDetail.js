import { View, Text } from 'react-native'
import React from 'react'
import About from '../components/restaurantDetail/About'
import { Divider } from 'react-native-elements'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'
import axios from 'axios'
import { useEffect, useState } from 'react'

SPOONACULAR_API_KEY = "<your api key>"


const foods = [
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


export default function RestaurantDetail({ route, navigation }) {

    const [menuData, setMenuData] = useState(foods)

    const generateRandomPrice = (min = 5, max = 25) => {
        return (Math.random() * (max - min) + min).toFixed(2);
    };

    const getSpoonacularMenuItems = async (restaurantName = "Lunch", location) => {
        try {
            let food_items = []
            if (restaurantName !== "Lunch") {
                {
                    restaurantName.map((item) => {
                        food_items.push(item.title)
                    })
                }
            }
            else {
                food_items = restaurantName
            }
            const response = await axios.get('https://api.spoonacular.com/food/menuItems/search', {
                params: {
                    query: food_items.length > 1 ? food_items.join(" or ") : food_items[0],
                    location: location,
                    apiKey: SPOONACULAR_API_KEY,
                },
            });
            const menuItemsWithPrices = response.data.menuItems.map(item => {
                return { ...item, price: `$${generateRandomPrice()}` };
            });
            if (menuItemsWithPrices.length === 0) {
                setMenuData(foods)
            } else {
                // only keep relevant properties
                let index = 0
                const extractRelevantProperties = (data) => {
                    return data.map(item => {
                        if (index === foods.length)
                            index = 0

                        return {
                            title: item.title,
                            description: foods[index++].description,
                            price: item.price,
                            image: item.image,
                        };
                    });
                };
                setMenuData(extractRelevantProperties(menuItemsWithPrices));
                // console.log(route.params, "from RestaurantDetail.js")
            }
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    useEffect(() => {
        getSpoonacularMenuItems(route.params.categories, route.params.location)
    }, [])
    return (
        <View>
            <About route={route} />
            <Divider width={1.8} style={{ marginVertical: 20 }} />
            <MenuItems restaurantName={route.params.name} foods={menuData} />
            <ViewCart navigation={navigation} />
        </View>
    )
}