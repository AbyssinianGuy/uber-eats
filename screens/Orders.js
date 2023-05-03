import { View, Text, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider } from 'react-native-elements'
import firebase from 'firebase/compat'
import { useEffect, useState } from 'react'
import BottomTabs from '../components/home/BottomTabs'
import MenuItems from '../components/restaurantDetail/MenuItems'
import Modal from 'react-native-modal'

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedOrderItems, setSelectedOrderItems] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = () => {
        const db = firebase.firestore()
        const unsubscribe = db.collection('orders').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
            const ordersData = snapshot.docs.map((doc) => {
                return doc.data();
            });
            setOrders(ordersData);
            setRefreshing(false);
        })
        return () => unsubscribe(); // shutdown listener
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const options = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const calculateTotal = (items) => {
        const TAX_RATE = 0.15;
        const total = items.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);
        const totalWithTax = total * (1 + TAX_RATE);
        return totalWithTax.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const showOrderDetails = (items) => {
        setSelectedOrderItems(items);
        setModalVisible(true);
    }

    const receiptNum = (order) => {
        const orderId = order.createdAt.toMillis().toString();
        return orderId.substring(orderId.length - 6, orderId.length - 1);
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#ddd", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10
                }}>
                    Orders
                </Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {/* Display all orders here */}
                {orders.map((order, index) => (
                    <View key={index} style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        backgroundColor: '#f8f8f8',
                        padding: 10,
                        marginVertical: 5,
                        marginHorizontal: 10
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10
                        }}>
                            Order #{receiptNum(order)}

                        </Text>
                        <Text style={{
                            color: "#e47911",
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10
                        }}>
                            {order.restaurantName}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10
                        }}>
                            {formatDate(order.createdAt)}
                        </Text>
                        <MenuItems foods={order.items} hideCheckbox={true} />
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 10,
                            marginVertical: 15,
                        }}>
                            Total: {calculateTotal(order.items)}
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#5cb108',
                                paddingHorizontal: 20,
                                marginHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 5,
                                marginTop: 10,
                                alignItems: 'center'
                            }}
                            onPress={() => showOrderDetails(order.items)}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Order</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
            <Modal isVisible={isModalVisible}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>Order Items:</Text>
                    <MenuItems foods={selectedOrderItems} hideCheckbox={true} />
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#5cb108',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderRadius: 5,
                            marginTop: 10,
                            alignItems: 'center'
                        }}

                        onPress={() => setModalVisible(false)} >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
