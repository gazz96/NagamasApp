import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { ActivityIndicator, Appbar, Button, Icon, List, TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import OrderAction from '../actions/OrderAction'
import Rp from '../components/Rp'

const CartScreen = () => {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState([])
  const isFocused = useIsFocused();

  const getCarts = async () => {
    setIsLoading(true)
    try {
      const response = await OrderAction.cart();
      console.log('response cart', response?.data);
      setCarts(response?.data)
    }
    catch (error) {
      console.log('data', error);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      getCarts()
    }

  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenWrapper style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.Content title="Cart" titleStyle={{
            fontWeight: 'bold'
          }} />
        </Appbar.Header>

        <View style={{ paddingHorizontal: 16 }}>
          {
            isLoading ? <ActivityIndicator /> :
              (carts.items).map((item) => {
                return (
                  <View style={{ marginBottom: 16, borderBottomColor: '#eee', borderBottomWidth: 1, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>{item.item_name}</Text>
                      <Text style={{ color: '#222', fontWeight: 'bold' }}>{Rp(item.amount)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#eee', borderRadius: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>
                          <Icon source="minus" />
                        </Text>
                      </TouchableOpacity>

                      <TextInput
                        style={{ backgroundColor: '#fff' }}
                        value={(item.item_qty).toString()} />
                      <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#eee', borderRadius: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon source="plus" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
          }
        </View>


      </ScreenWrapper>
      <View style={{ paddingHorizontal: 16, position: 'absolute', bottom: 0, height: 50, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text>Total Harga</Text>
          {
            isLoading 
              ? <ActivityIndicator/>
              : <Text style={{ fontWeight: 'bold' }}>
                  { Rp((carts.items).reduce((a, b) => parseInt(a.amount) + parseInt(b.amount))) }
              </Text>
          }
        </View>
        
        {
            isLoading 
              ? <ActivityIndicator/> 
              :
              <Button mode="contained">Beli ({(carts.items).reduce((a, b) => parseInt(a.item_qty) + parseInt(b.item_qty))})</Button>
        }
      </View>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})