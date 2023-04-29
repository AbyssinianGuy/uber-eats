import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

export default function ViewCart() {
    const items = useSelector((state) => state.cartReducer.selectedItems.items)
    const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0)

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    })

    // console.log(totalUSD, "👍")

    return (
        <>
            {total ? (
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
                                // alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 20, marginRight: 25 }}>View Cart</Text>
                            <Text style={{ color: "white", fontSize: 20 }}>({totalUSD})</Text>
                        </TouchableOpacity>
                    </View>
                </View>) : (<></>)}
        </>
    )
}