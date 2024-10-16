import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Splash from '../components/Splash';
import UserAction from '../actions/UserAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, HelperText, TextInput, List } from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import Gap from '../components/Gap'
import Rp from '../components/Rp';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-toast-message';
import InvalidFormValidation from '../components/InvalidFormValidation';

const HistoryOrderScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [tab, setTab] = useState('Order');
    const [selectedOrder, setSelectedOrder] = useState([]);
    const navigation = useNavigation();

    const getOrderList = async (options = {}) => {
        setIsLoading(true)
        try {
            const response = await UserAction.getHistoryOrder(options);
            setRows(response.data);
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setIsLoading(false);
        }
    }

    const updateBuktiBayar = async () => {
        setIsLoading(true);
        try {
            await UserAction.updateBuktiBayar(selectedOrder);
            await getOrderList({
                posts_per_page: 100,
                status: tab
            });
            Toast.show({
                type: 'success',
                text1: 'Berhasil disimpan'
            })
        }
        catch (error) {
            console.log('error', error);
            if (error?.response?.status == 422) {
                InvalidFormValidation(error?.response?.data?.errors ?? []);
            }

            if (error?.response?.status == 400) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Input'
                });
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['50%', '100%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const hasErrors = () => {
        return true;
    };


    useEffect(() => {
        getOrderList({
            posts_per_page: 100,
            status: tab
        });
    }, [])

    if (isLoading) {
        return <Splash />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <ScreenWrapper>
                    <Appbar.Header mode='small'>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Appbar.Content title="History Order" />
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

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 14 }}>{row?.so_cust_email}</Text>
                                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>{Rp(row?.total_amount)}</Text>
                                        </View>
                                        <Gap height={8} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 12, color: '#858585' }}>{row?.so_date} | </Text>
                                            <Text style={{ fontSize: 12, color: '#858585' }}>{row?.so_id}</Text>
                                        </View>

                                        <Gap height={8} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Button mode="contained" style={{ marginRight: 8 }} onPress={() => {
                                                navigation.navigate('Admin Order Detail', {
                                                    order: row
                                                })
                                            }}>Lihat</Button>

                                            {
                                                row?.so_status == "Order"
                                                    ?
                                                    <Button>Menunggu Konfirmasi Admin</Button>
                                                    : <></>
                                            }

                                            {
                                                row.so_status == "Payment Needed"
                                                    ? <>
                                                        <Button mode="contained" onPress={() => {
                                                            setSelectedOrder(row)
                                                            handlePresentModalPress()
                                                        }}>Isi Bukti Bayar</Button>
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
                            tab == "Payment Needed"
                                ?
                                <BottomSheetView style={styles.contentContainer}>
                                    <TextInput label="Bank"
                                        value={selectedOrder?.so_bank_name}
                                        onChangeText={(text) =>
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                so_bank_name: text
                                            })
                                        }
                                    />
                                    <Gap height={8} />
                                    <TextInput label="Atas Nama"
                                        value={selectedOrder?.so_account_name}
                                        onChangeText={(text) =>
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                so_account_name: text
                                            })
                                        } />
                                    <Gap height={8} />

                                    <TextInput label="Waktu Transfer"
                                        value={selectedOrder?.so_transfer_time}
                                        onChangeText={(text) =>
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                so_transfer_time: text
                                            })
                                        }
                                        render={props =>
                                            <TextInputMask
                                                {...props}
                                                type={'datetime'}
                                                options={{
                                                    format: 'YYYY/MM/DD HH:mm:ss'
                                                }}
                                            />
                                        }
                                    />
                                    <HelperText type="info" visible={true}>
                                        Contoh: 2024/10/20 13:20:13
                                    </HelperText>
                                    <Gap height={8} />

                                    <TextInput label="Jumlah Transfer"
                                        value={selectedOrder?.so_transfer_amount}
                                        onChangeText={(text) =>
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                so_transfer_amount: text
                                            })
                                        } />
                                    <Gap height={8} />

                                    <TextInput label="Catatan"
                                        value={selectedOrder?.so_transfer_notes}
                                        multiline={true}
                                        numberOfLines={4}
                                        onChangeText={(text) =>
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                so_transfer_notes: text
                                            })
                                        } />
                                    <Gap height={8} />


                                    <Button mode='contained' onPress={() => {
                                        updateBuktiBayar();
                                    }}>Konfirmasi</Button>
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

export default HistoryOrderScreen

const styles = StyleSheet.create({
    contentContainer: {
        width: '100%'
    },
})