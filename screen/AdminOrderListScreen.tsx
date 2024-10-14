import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput, DataTable, ActivityIndicator } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import OrderAction from '../actions/OrderAction'
import Rp from '../components/Rp'
import BaseUrl from '../actions/BaseUrl'
import OpenWebUrl from '../components/OpenWebUrl'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const AdminOrderListScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [tab, setTab] = useState('Order');

    const getOrderList = async (options = {}) => {
        setLoading(true)
        try {
            const response = await OrderAction.list(options);
            setRows(response.data);
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setLoading(false);
        }
    }

    const editOrder = (row: object = {}) => {
        navigation.navigate('Admin Order Form', {
            row: row
        })
    }

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        getOrderList({
            posts_per_page: 100,
            status: tab
        });
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
                    {/* <Appbar.Action icon="plus" onPress={() => {
                        navigation.navigate('Admin Order Form');
                    }} /> */}
                </Appbar.Header>

                <View style={{ paddingHorizontal: 16 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            ['Order', 'Payment Needed', 'Paid', 'Delivery Note'].
                                map((value, index) => (
                                    <Button
                                        mode={tab == value ? 'contained' : 'outlined'}
                                        style={{ marginRight: 4 }}
                                        key={value}
                                        onPress={() => {

                                            getOrderList({
                                                posts_per_page: 100,
                                                status: value
                                            })
                                            setTab(value)
                                        }}>{value}</Button>
                                ))
                        }
                    </ScrollView>
                </View>

                <Gap height={16} />


                <View style={{ paddingHorizontal: 16 }}>

                    <Gap height={12} />

                    {
                        rows.map((row, index) => {
                            return (
                                <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomColor: '#ccc', borderBottomWidth: 1 }} key={row.so_id}>

                                    <View>
                                        <Text>Customer</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{row.so_cust_email}</Text>
                                    </View>
                                    <Gap height={8} />
                                    <View>
                                        <Text>Shipping</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{row.shipping_address ?? '-'}</Text>
                                    </View>


                                    <Gap height={8} />
                                    <View>
                                        <Text>Jumlah Item</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{row.count_items}</Text>
                                    </View>

                                    <Gap height={8} />
                                    <View>
                                        <Text>Total</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{Rp(row.total_amount)}</Text>
                                    </View>


                                    <Gap height={8} />
                                    <View style={{ flexDirection: 'row' }}>
                                        {/* <Button mode='contained' style={{marginRight: 8}} onPress={() => {
                                           
                                        }}>Lihat</Button> */}
                                        <Button mode='contained' onPress={() => {
                                            OpenWebUrl(BaseUrl('invoice/' + row.so_id))
                                        }} style={{ marginRight: 8 }}>Invoice</Button>

                                        <Button mode='contained' onPress={() => {
                                            editOrder(row)
                                        }}>Edit</Button>
                                    </View>
                                </View>
                            )
                        })
                    }



                </View>
            </ScreenWrapper>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})


export default AdminOrderListScreen