import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Gap from './Gap'
import { ScrollView } from 'react-native-gesture-handler'
import ProductAction from '../actions/ProductAction'
import { ActivityIndicator } from 'react-native-paper'
import ProductItem from './ProductItem'
import Rp from './Rp'
import { useNavigation } from '@react-navigation/native'
import BaseUrl from '../actions/BaseUrl'



const CategoryProductBlock = ({ name = "", postsPerPage = 7 }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const navigation = useNavigation();

    const getProducts = async() => {
        setIsLoading(true);
        try {
            const response = await ProductAction.list({
                exact_category: name, 
                posts_per_page: postsPerPage
            })
            setRows(response.data);
        }
        catch(error) {

        }
        finally {
            setIsLoading(false);
        }
    }

    const renderProducts = () => {
        let items: any = [];
        if((rows).length) {
            (rows).map((row, index) => {
                items.push(
                    <View style={{marginRight: 16}} key={row.id}>
                        <ProductItem 
                            id={row.id}
                            imageUrl={BaseUrl(row.item_img_location_1)}
                            title={row.item_name} 
                            price={Rp(row.item_price_sell)} 
                            />
                    </View>
                )
            })
        }
        return items;
    }

    const goToCategoryProductScreen = () => {
        navigation.navigate('Category Product Screen', {
            category: name 
        });
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <View style={{ paddingHorizontal: 16, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: '#222' }}>{name}</Text>
                    <TouchableOpacity onPress={goToCategoryProductScreen}>
                        <Text style={{ color: 'red', fontSize: 10, fontWeight: 'bold' }}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={16} />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                    {
                        isLoading 
                            ? <ActivityIndicator/>
                            : renderProducts()
                         
                    }
                </ScrollView>
            </View>
        </>
    )
}

export default CategoryProductBlock;

const styles = StyleSheet.create({})