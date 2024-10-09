import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput, DataTable, ActivityIndicator } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import OrderAction from '../actions/OrderAction'
import Rp from '../components/Rp'
import BaseUrl from '../actions/BaseUrl'
import OpenWebUrl from '../components/OpenWebUrl'

const AdminOrderListScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const getFaqData = async () => {
        setLoading(true)
        try {
            const response = await OrderAction.list({
                posts_per_page: 100
            });
            console.log('response', response);
            setRows(response.data);
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFaqData();
    }, [isFocused])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Order Data" />
                    <Appbar.Action icon="plus" onPress={() => {
                        navigation.navigate('Admin Order Form');
                    }} />
                </Appbar.Header>


                <View style={{ paddingHorizontal: 16 }}>

                    <Gap height={12} />

                    {
                        rows.map((row, index) => {
                            return (
                                <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomColor: '#ccc', borderBottomWidth: 1 }} key={row.id}>
                                    <TouchableOpacity>
                                    <Text 
                                        style={{
                                            backgroundColor: '#ccc', 
                                            color: '#222', 
                                            flexDirection: 'row',
                                            paddingHorizontal: 8,
                                            paddingVertical: 6, 
                                            marginBottom: 8,
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            width: 100,
                                            textAlign: 'center'
                                            
                                        }}>{row.so_status}</Text>
                                    </TouchableOpacity>
                                    <View>
                                        <Text>Customer</Text>
                                        <Text style={{fontWeight: 'bold'}}>{row.so_cust_email}</Text>
                                    </View>
                                    <Gap height={8}/>
                                    <View>
                                        <Text>Shipping</Text>
                                        <Text style={{fontWeight: 'bold'}}>{row.shipping_address ?? '-'}</Text>
                                    </View>


                                    <Gap height={8}/>
                                    <View>
                                        <Text>Jumlah Item</Text>
                                        <Text style={{fontWeight: 'bold'}}>{row.count_items}</Text>
                                    </View>

                                    <Gap height={8}/>
                                    <View>
                                        <Text>Total</Text>
                                        <Text style={{fontWeight: 'bold'}}>{Rp(row.total_amount)}</Text>
                                    </View>


                                    <Gap height={8}/>
                                    <View style={{flexDirection: 'row'}}>
                                        <Button mode='contained' style={{marginRight: 8}} onPress={() => {
                                           
                                        }}>Lihat</Button>
                                        <Button mode='contained' onPress={() => {
                                             OpenWebUrl(BaseUrl('invoice/' + row.so_id))
                                        }} style={{marginRight: 8}}>Invoice</Button>
                                        <Button mode='contained'>Edit</Button>
                                    </View>
                                </View>
                            )
                        })
                    }

                    

                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})


export default AdminOrderListScreen