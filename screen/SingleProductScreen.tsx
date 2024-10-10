import { Dimensions, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { ActivityIndicator, Appbar, Button, DataTable, Snackbar } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import Gap from '../components/Gap'
import ProductAction from '../actions/ProductAction'
import Rp from '../components/Rp'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderAction from '../actions/OrderAction'
import Toast from 'react-native-toast-message'
import BaseUrl from '../actions/BaseUrl'

const SingleProductScreen = () => {
    const window = useWindowDimensions();
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const getProduct = async () => {
        setIsLoading(true);
        try {
            const response = await ProductAction.edit(route.params?.productId)
            setProduct(response);

        }
        catch (error) {

        }
        finally {
            setIsLoading(false);
        }
    }

    const addToCart = async() => {
        setIsLoading(true)
        try {
            const response = await OrderAction.addToCart(product?.id);
            setVisible(true);
            // Toast.show({
            //     position: 'bottom',
            //     type: 'snackBarToast',
            //     text1: 'Berhasil dimasukan ke keranjang',
            //     props: {
            //         onPressText: 'Lihat',
            //         onPress: () => {
            //             navigation.navigate('Tab.Cart');
            //         }
            //     }
                
            // });
        }
        catch(error) {
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

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScreenWrapper>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => {
                        navigation.goBack();
                    }} />
                </Appbar.Header>
                {
                    isLoading ? <ActivityIndicator />
                        :
                        <>

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    product.item_img_location_1 ?
                                    <Image source={{
                                        uri: BaseUrl(product.item_img_location_1)
                                    }} style={{ width: window.width, height: 180, marginRight: 16 }} resizeMode='contain' />
                                    : <></>
                                }
                                
                                {/* <Image source={require('../assets/banner-01.jpg')} style={{ width: 320, height: 180, marginRight: 16 }} resizeMode='contain' /> */}
                            </ScrollView>

                            <Gap height={8} />

                            <View style={{ paddingHorizontal: 16 }}>
                                <Text style={{ fontWeight: 'bold', color: '#222222' }}>{Rp(product.item_price_sell)}</Text>
                                <Gap height={4} />
                                <Text style={{ color: '#222222' }}>{product.item_name}</Text>
                                <Gap height={24} />
                                
                                <Text style={{ fontWeight: 'bold', color: '#222222' }}>Detail Produk</Text>
                                <Gap height={4} />
                                <DataTable>
                                    <DataTable.Row>
                                        <DataTable.Cell>Stok Tersedia</DataTable.Cell>
                                        <DataTable.Cell>{product.item_avl_qty}</DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell>Berat</DataTable.Cell>
                                        <DataTable.Cell>{product.item_weight} {product.item_weight_um}</DataTable.Cell>
                                    </DataTable.Row>

                                    <Gap height={24}/>

                                    <View>
                                        <Text style={{color: '#222'}}>{product.item_description}</Text>
                                    </View>
                                </DataTable>
                                <Gap height={16}/>
                                
                            </View>




                        </>
                }

            </ScreenWrapper>
            <View style={{padding: 16}}>
                <Button mode="contained" onPress={addToCart} loading={isLoading}>Keranjang</Button>
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Lihat',
                onPress: () => {
                    navigation.navigate('Tab.Cart');
                },
                }}>
                Berhasil dimasukan ke keranjang
            </Snackbar>
        </SafeAreaView>
    )
}

export default SingleProductScreen

const styles = StyleSheet.create({})