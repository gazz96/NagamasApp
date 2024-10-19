import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button } from 'react-native-paper'
import ScreenWrapper from '../components/ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import OpenWebUrl from '../components/OpenWebUrl'
import BaseUrl from '../actions/BaseUrl'

const AdminPrintLabelScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState('');

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

    useEffect(() => {
        getOrderList();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Print Label" />
                </Appbar.Header>

                <View style={{ paddingHorizontal: 16 }}>
                        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                            {
                                ['Order', 'Payment Needed', 'Paid', 'Delivery Note'].
                                    map((value, index) => (
                                        <Button
                                            mode={tab == value ? 'contained' : 'outlined'}
                                            key={value}
                                            style={{marginBottom: 10}}
                                            onPress={() => {
                                                setTab(value)
                                                OpenWebUrl(BaseUrl('print-label?status=' + tab))
                                            }}>{value}</Button>
                                    ))
                            }
                        {/* </ScrollView> */}
                    </View>

            </ScreenWrapper>
        </SafeAreaView>
    )
}

export default AdminPrintLabelScreen

const styles = StyleSheet.create({})