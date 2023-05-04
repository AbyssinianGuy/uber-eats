import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import RestaurantDetail from './screens/RestaurantDetail'
import { Provider as ReactProvider } from 'react-redux';
import configureAppStore from './redux/store';
import OrderCompleted from './screens/OrderCompleted';
import Browse from './screens/Browse';
import Orders from './screens/Orders';
import Grocery from './screens/Grocery';
import Account from './screens/Account';
import GroceryDetail from './screens/GroceryDetail';
import Login from './screens/Login';


const store = configureAppStore()

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    }

    return (
        <ReactProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
                    <Stack.Screen name="GroceryDetail" component={GroceryDetail} />
                    <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
                    <Stack.Screen name="Browse" component={Browse} />
                    <Stack.Screen name="Grocery" component={Grocery} />
                    <Stack.Screen name="Orders" component={Orders} />
                    <Stack.Screen name="Account" component={Account} />
                    <Stack.Screen name="Login" component={Login} />

                </Stack.Navigator>
            </NavigationContainer>
        </ReactProvider>
    )
}
//todo: create a navigation for web