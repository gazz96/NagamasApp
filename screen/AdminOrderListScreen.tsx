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

import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';


const AdminOrderListScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [tab, setTab] = useState('Order');
    const [selectedOrder, setSelectedOrder] = useState({});

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

    const updateToPaymentNeeded = async () => {
        setLoading(true)
        try {
            await OrderAction.updateToPaymentNeeded(selectedOrder);
            await getOrderList({
                posts_per_page: 100,
                status: tab
            })
        }
        catch (error) {

        }
        finally {
            setLoading(false);
        }
    };

    const editOrder = (row: object = {}) => {
        navigation.navigate('Admin Order Form', {
            row: row
        })
    }

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
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
            <BottomSheetModalProvider>
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

                                        {
                                            row?.so_status == "Payment Needed"
                                                ?
                                                <>
                                                <Gap height={8} />
                                                <View>
                                                    <Text>Admin Fee</Text>
                                                    <Text style={{ fontWeight: 'bold' }}>{row.so_admin_fee}</Text>
                                                </View>

                                                <Gap height={8} />
                                                <View>
                                                    <Text>Asuransi</Text>
                                                    <Text style={{ fontWeight: 'bold' }}>{row.so_ship_insur_value}</Text>
                                                </View>

                                                <Gap height={8} />
                                                <View>
                                                    <Text>Biaya Pengiriman</Text>
                                                    <Text style={{ fontWeight: 'bold' }}>{row.so_ship_fee}</Text>
                                                </View>

                                                </>
                                                : <></>
                                        }

                                        <Gap height={8} />
                                        <View>
                                            <Text>Total</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{Rp(row.total_amount)}</Text>
                                        </View>


                                        <Gap height={8} />
                                        <View style={{ flexDirection: 'row' }}>

                                            {/* <Button mode='contained' onPress={() => {
                                                OpenWebUrl(BaseUrl('invoice/' + row.so_id))
                                            }} style={{ marginRight: 4 }}>Invoice</Button> */}

                                            {/* <Button style={{ marginRight: 4}} mode='contained' onPress={() => {
                                                editOrder(row)
                                            }}>Edit</Button> */}

                                            {
                                                row?.so_status == "Order"
                                                    ?
                                                    <Button mode="contained" onPress={() => {
                                                        setSelectedOrder(row)
                                                        handlePresentModalPress()
                                                    }}>Konfirmasi</Button>
                                                    : <></>
                                            }

                                            {
                                                row.so_status == "Payment Needed"
                                                    ? <>
                                                        <Button mode="contained" onPress={() => {
                                                            setSelectedOrder(row)
                                                            handlePresentModalPress()
                                                        }}>Lihat Bukti Bayar</Button>
                                                    </> : <></>
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                </ScreenWrapper>


                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={{
                        borderWidth: 1,
                        borderColor: '#EEE',
                        borderRadius: 16
                    }}
                >
                    <View style={{ paddingHorizontal: 16 }}>
                        {
                            tab == "Order"
                                ?
                                <BottomSheetView style={styles.contentContainer}>
                                    <TextInput label="Biaya Admin"
                                        value={selectedOrder?.so_admin_fee}
                                        onChangeText={(text) => {
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                ['so_admin_fee']: text
                                            })
                                        }} />
                                    <Gap height={4} />
                                    <TextInput label="Biaya Asuransi"
                                        value={selectedOrder?.so_ship_insur_value}
                                        onChangeText={(text) => {
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                ['so_ship_insur_value']: text
                                            })
                                        }} />
                                    <Gap height={4} />

                                    <TextInput label="Biaya Pengiriman"
                                        value={selectedOrder?.so_ship_fee}
                                        onChangeText={(text) => {
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                ['so_ship_fee']: text
                                            })
                                        }} />
                                    <Gap height={8} />
                                    <Button mode='contained' onPress={() => {
                                        updateToPaymentNeeded()
                                    }}>Konfirmasi</Button>
                                    <Gap height={8} />
                                </BottomSheetView>
                                : <></>

                        }

{
                            tab == "Payment Needed"
                                ?
                                <BottomSheetView style={styles.contentContainer}>
                                    <TextInput label="Bank"
                                        value={selectedOrder?.so_bank_name} 
                                        />
                                    <Gap height={4} />
                                    <TextInput label="Atas Nama"
                                        value={selectedOrder?.so_account_name} />
                                    <Gap height={4} />

                                    <TextInput label="Waktu Transfer"
                                        value={selectedOrder?.so_transfer_time} />
                                    <Gap height={8} />

                                    <TextInput label="Jumlah Transfer"
                                        value={selectedOrder?.so_transfer_amount} />
                                    <Gap height={8} />

                                    <TextInput label="Catatan"
                                        value={selectedOrder?.so_transfer_notes} />
                                    <Gap height={8} />


                                    <Button mode='contained' onPress={() => {
                                        //updateToPaymentNeeded()
                                    }}>Sudah dibayar ?</Button>
                                    <Gap height={8} />
                                </BottomSheetView>
                                : <></>

                        }

                    </View>
                </BottomSheetModal>



            </BottomSheetModalProvider>
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
        width: '100%'
    },
})


export default AdminOrderListScreen