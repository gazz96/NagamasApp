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
import Toast from 'react-native-toast-message'


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

    const updateToLunas = async () => {
        setLoading(true)
        try {
            await OrderAction.updateToLunas(selectedOrder);
            await getOrderList({
                posts_per_page: 100,
                status: tab
            })
            Toast.show({
                type: 'success',
                text1: 'Order sudah dibayar'
            })
        }
        catch (error) {

        }
        finally {
            setLoading(false);
        }
    };

    const updateToDelivery = async () => {
        setLoading(true)
        try {
            await OrderAction.updateToDelivery(selectedOrder);
            await getOrderList({
                posts_per_page: 100,
                status: tab
            })
            Toast.show({
                type: 'success',
                text1: 'Barang dikirim'
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
    const snapPoints = useMemo(() => ['25%', '100%'], []);

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
                                            key={value}
                                            style={{marginRight: 8}}
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

                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 14 }}>{row?.so_cust_email}</Text>
                                            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 14}}>{Rp(row?.total_amount)}</Text>
                                        </View>  
                                        <Gap height={8}/>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 12, color: '#858585' }}>{row?.so_date} | </Text>
                                            <Text style={{ fontSize: 12, color: '#858585' }}>{row?.so_id}</Text>
                                        </View>
                                
                                        <Gap height={8} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Button mode="contained" style={{marginRight: 8}} onPress={() => {
                                                navigation.navigate('Admin Order Detail', {
                                                    order: row
                                                })
                                            }}>Lihat</Button>
                                            {
                                                row?.so_status == "Order"
                                                    ?
                                                    <Button mode="contained"  onPress={() => {
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

                                            {
                                                row.so_status == "Paid"
                                                    ? <>
                                                        <Button mode="contained" onPress={() => {
                                                            setSelectedOrder(row)
                                                            handlePresentModalPress()
                                                        }}>Tandai sebagai dikirim</Button>
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
                                        value={(selectedOrder?.so_admin_fee)}
                                        onChangeText={(text) => {
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                ['so_admin_fee']: text
                                            })
                                        }} />
                                    <Gap height={4} />
                                    <TextInput label="Biaya Asuransi"
                                        value={(selectedOrder?.so_ship_insur_value)}
                                        onChangeText={(text) => {
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                ['so_ship_insur_value']: text
                                            })
                                        }} />
                                    <Gap height={4} />

                                    <TextInput label="Biaya Pengiriman"
                                        value={(selectedOrder?.so_ship_fee)}
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
                                        value={selectedOrder?.so_transfer_notes} 
                                        multiline={true}
                                        numberOfLines={3}/>
                                    <Gap height={8} />


                                    <Button mode='contained' onPress={() => {
                                        updateToLunas();
                                    }}>Tandai Sebagai Lunas</Button>
                                    <Gap height={8} />
                                </BottomSheetView>
                                : <></>

                        }

{
                            tab == "Paid"
                                ?
                                <BottomSheetView style={styles.contentContainer}>
                                    <TextInput label="Nomor Resi"
                                        value={selectedOrder?.so_awb}
                                        onChangeText={(text) => setSelectedOrder({
                                            ...selectedOrder,
                                            so_awb: text
                                        })}
                                    />
                                   <Gap height={8}/>
                                    <Button mode='contained' onPress={() => {
                                        updateToDelivery();
                                    }}>Dikirim</Button>
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