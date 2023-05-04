import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import OrderItem from './OrderItem'
import firebase from '../../firebase'
import LottieView from 'lottie-react-native'

export default function ViewCart({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)
    const total = items
        .map((item) => Number(item.price?.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0)

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    })

    const tax = (parseFloat(totalUSD.replace('$', '')) * 0.15).toFixed(2)  // 15% tax

    const totalWithTax = (parseFloat(totalUSD.replace('$', '')) + parseFloat(tax)).toFixed(2)  // total + tax

    const addOrderToFirebase = () => {
        setLoading(true)
        const db = firebase.firestore()
        db.collection('orders').add({
            items: items,
            restaurantName: restaurantName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            setTimeout(() => {
                setLoading(false)
                setModalVisible(false)
                navigation.navigate('OrderCompleted')
            }, 2500)
        })
    }


    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
        },
        modalCheckoutContainer: {
            backgroundColor: "white",
            padding: 16,
            height: 500,
            borderWidth: 1,
        },
        restaurantName: {
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            marginTop: 10,
            alignItems: "center",
        },
        subTotalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
        },
        subTotalText: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
        },
    })

    const checkoutModalContent = () => {
        return (
            <>
                <View style={styles.modalContainer} >
                    <View style={styles.modalCheckoutContainer}>
                        <TouchableOpacity style={{
                            borderRadius: 30,
                            borderRadius: 30,
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "flex-end"
                        }}
                        >
                            <Text style=
                                {{
                                    color: "black",
                                    fontSize: 25,
                                    textAlign: "right",
                                }}
                                onPress={() => setModalVisible(false)}
                            >⚔️</Text>
                        </TouchableOpacity>
                        <Text style={styles.restaurantName} >
                            Order - {restaurantName}

                        </Text>


                        {items.map((item, index) => (
                            <OrderItem key={index} item={item} />
                        ))}
                        <View style={styles.subTotalContainer}>
                            <Text style={styles.subTotalText}>Tax (15%)</Text>
                            <Text>${tax}</Text>
                        </View>
                        <View style={styles.subTotalContainer}>
                            <Text style={styles.subTotalText}>Subtotal</Text>
                            <Text>${totalWithTax}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    backgroundColor: "black",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    padding: 15,
                                    borderRadius: 30,
                                    width: 300,
                                    position: "relative",
                                    alignItems: "center",
                                }}
                                onPress={() => {
                                    addOrderToFirebase()
                                    setModalVisible(false)
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>Checkout </Text>
                                <Text style={{ color: "white", fontSize: 20 }}>({total ? '$' + totalWithTax : ""}) 😋</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </>
        )
    }

    return (
        <>
            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                {checkoutModalContent()}
            </Modal>
            {totalWithTax > 0 ? (
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 80,
                    zIndex: 999,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: "black",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                padding: 15,
                                borderRadius: 30,
                                width: 300,
                                position: "relative",
                            }}
                            onPress={() => { setModalVisible(true) }}
                        >
                            <Text style={{ color: "white", fontSize: 20, marginRight: 25 }}>View Cart</Text>
                            <Text style={{ color: "white", fontSize: 20 }}>({totalUSD})</Text>
                        </TouchableOpacity>
                    </View>
                </View>) : (<></>)}
            {
                loading ? (
                    <View style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        position: "absolute",
                        justifyContent: "center",
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                    }}>
                        <View style={{
                            padding: 20,
                            borderRadius: 15,
                            alignItems: "center",
                        }}>
                            <LottieView
                                style={{ height: 200 }}
                                source={require("../../assets/animations/scanner.json")}
                                autoPlay
                                speed={3}
                            />
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                            }}>Processing Order</Text>
                        </View>
                    </View>
                ) : (<></>)
            }
        </>
    )
}