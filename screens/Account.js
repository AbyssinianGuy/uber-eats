import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

export default function Account() {
    return (
        <SafeAreaView style={{ backgroundColor: "#ddd", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <Text>Account</Text>
            </View>
        </SafeAreaView>
    )
}