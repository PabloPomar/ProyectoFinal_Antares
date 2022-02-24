import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenLayout from '../components/ScreenLayout'
import tw from 'tailwind-react-native-classnames'

const OrderScreen = () => {
  return (
    <ScreenLayout>
        <View style={tw`flex-col flex-1 items-center w-full `}>
            <Text>El pedido del tio</Text>
        </View>
    </ScreenLayout>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})