import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
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
import StartingScreen from './screens/StartingScreen';
import Signup from './screens/Signup';
import SplashScreen from './components/SplashScreen';


const store = configureAppStore()

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    }

    return (
        <ReactProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen" screenOptions={screenOptions}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} options={{
                        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                        gestureDirection: "vertical"
                    }} />
                    <Stack.Screen name="Signup" component={Signup} options={{
                        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                        gestureDirection: "vertical",
                    }} />
                    <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
                    <Stack.Screen name="GroceryDetail" component={GroceryDetail} />
                    <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
                    <Stack.Screen name="Browse" component={Browse} />
                    <Stack.Screen name="Grocery" component={Grocery} />
                    <Stack.Screen name="Orders" component={Orders} />
                    <Stack.Screen name="Account" component={Account} />
                    <Stack.Screen name="StartingScreen" component={StartingScreen} />


                </Stack.Navigator>
            </NavigationContainer>
        </ReactProvider>
    )
}
//todo: create a navigation for web