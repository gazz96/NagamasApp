import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { ActivityIndicator, Appbar, Button, Icon, List, TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import OrderAction from '../actions/OrderAction'
import Rp from '../components/Rp'
import AuthAction from '../actions/AuthAction'

const CartScreen = () => {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState([])
  const isFocused = useIsFocused();
  const token = AuthAction.getUserToken();

  const getCarts = async () => {
  
    setIsLoading(true)
    
    try {
      const response = await OrderAction.cart();
      setCarts(response?.data?.items)
    }
    catch (error) {
      console.log('data', error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const addToCart = async (productId) => {
    setIsLoading(true)
    try {
      await OrderAction.addToCart(productId);
      await getCarts();

    }
    catch (error) {
      if (error.response) {
        console.log('error.esponse', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log('error.request');
        console.log(error.request);
      } else {
        console.log('error.message');
        console.log('Error', error.message);
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  const subtractFromCart = async (productId) => {
    setIsLoading(true)
    try {
      await OrderAction.subtractFromCart(productId);
      await getCarts();
    }
    catch (error) {
      if (error.response) {
        console.log('error.esponse', error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log('error.request');
        console.log(error.request);
      } else {
        console.log('error.message');
        console.log('Error', error.message);
      }
    }
    finally {
      setIsLoading(false);
    }
  }

  const getTotal = () => {
    let total = 0;
    carts.map((cart) => {
      total += parseInt(cart.amount);
    })
    return Rp(total);
  }

  const getQty = () => {
    let total = 0;
    carts.map((cart) => {
      total += parseInt(cart.item_qty);
    })
    return total;
  }

  useEffect(() => {

      getCarts()
  }, [isFocused])

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
              carts.map((item, index) => {
                return (
                  <View key={item.item_id} style={{ marginBottom: 16, borderBottomColor: '#eee', borderBottomWidth: 1, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text>{item.item_name}</Text>
                      <Text style={{ color: '#222', fontWeight: 'bold' }}>{Rp(item.amount)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#eee', borderRadius: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                        onPress={() => {
                          subtractFromCart(item.item_id)
                        }}>
                        <Text>
                          <Icon source="minus" />
                        </Text>
                      </TouchableOpacity>

                      <TextInput
                        style={{ backgroundColor: '#fff' }}
                        value={(item.item_qty).toString()} 
                        keyboardType='numeric'
                        onChangeText={(text) => {
                        }}/>

                      <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#eee', borderRadius: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                        onPress={() => {
                          addToCart(item.item_id)
                        }}>
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
              ? <ActivityIndicator />
              : <Text style={{ fontWeight: 'bold' }}>
                {
                  getTotal()
                }
              </Text>
          }
        </View>

        {
          isLoading
            ? <ActivityIndicator />
            :
            <Button mode="contained">Beli ({getQty()})
            </Button>
        }
      </View>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})