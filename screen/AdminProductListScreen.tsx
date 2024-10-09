import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput, Card, Text } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import ProductAction from '../actions/ProductAction'
import BaseUrl from '../actions/BaseUrl'

const AdminProductListScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const getProductData = async () => {
        setLoading(true)
        try {
            const response = await ProductAction.list();
            console.log('response', response);
            setRows(response);
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setLoading(false);
        }
    }

    const refreshPage = () => {
        getProductData();
    }

    useEffect(() => {
        if (isFocused) {
            getProductData();
        }
    }, [isFocused])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Product Data" />
                    <Appbar.Action icon="plus" onPress={() => {
                        navigation.navigate('Admin Product Form');
                    }} />
                </Appbar.Header>


                <View style={{ paddingHorizontal: 16 }}>

                    <Gap height={12} />

                    {
                        isLoading ?
                            (
                                <View>
                                    <Text>DATA TIDAK ADA</Text>
                                </View>
                            )
                            :
                            (
                                (rows.data).map((row, index) => {
                                    return (
                                        <Card key={row.id} style={{marginBottom: 12}}>
                                            <Card.Cover source={{ uri: BaseUrl(row.item_img_location_1) }} />
                                            <Card.Title 
                                                title={row.item_name} 
                                                subtitle={row.item_category}
                                                titleNumberOfLines={2}
                                                titleStyle={{ fontWeight: 'bold'}}/>
                                            <Card.Content>
                                                <View>
                                                    <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>Harga</Text>
                                                    <Text>{row.item_um} {row.item_price_sell}</Text>
                                                </View>
                                                <Gap height={4}/>
                                                <View>
                                                    <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>Berat</Text>
                                                    <Text>{row.item_weight} {row.item_weight_um}</Text>
                                                </View>
                                                <Gap height={4}/>
                                                <View>
                                                    <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>Stock Tersedia</Text>
                                                    <Text>{row.item_avl_qty}</Text>
                                                </View>
                                            </Card.Content>
                                            <Card.Actions>
                                                <Button onPress={() => {
                                                    navigation.navigate('Admin Product Form', {
                                                        row: row
                                                    })
                                                }}>Edit</Button>
                                            </Card.Actions>
                                        </Card>
                                    )
                                })

                            )
                    }

                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})


export default AdminProductListScreen