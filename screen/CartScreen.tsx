import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const CartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenWrapper style={{  flex: 1}}>
        <Appbar.Header>
          <Appbar.Content title="Cart" titleStyle={{
            fontWeight: 'bold'
          }} />
        </Appbar.Header>


          
          
      </ScreenWrapper>
      <View style={{ paddingHorizontal: 16, position: 'absolute', bottom: 0, height: 50, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between' }}>
        <View>
          <Text>Total Harga</Text>
          <Text style={{ fontWeight: 'bold' }}>Rp. 0</Text>
        </View>
        <Button mode="contained">Beli (0)</Button>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})