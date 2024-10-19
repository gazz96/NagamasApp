import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Gap from './Gap'
import { ScrollView } from 'react-native-gesture-handler'
import ProductAction from '../actions/ProductAction'
import { ActivityIndicator } from 'react-native-paper'
import ProductItem from './ProductItem'
import Rp from './Rp'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import BaseUrl from '../actions/BaseUrl'
import Splash from './Splash'

const SearchProductBlock = ({ keyword = "", category = "", postsPerPage = 20 }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const getProducts = async() => {
        setIsLoading(true);
        try {
            const response = await ProductAction.list({
                exact_category: category, 
                posts_per_page: postsPerPage,
                s: keyword,
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
                    <ProductItem 
                        id={row.id}
                        title={row.item_name} 
                        price={Rp(row.item_price_sell)}
                        imageUrl={BaseUrl(row.item_img_location_1)}
                        defaultWidth={"49%"} 
                        key={row.id}/>)
            })
        }
        return items;
    }

    useEffect(() => {
        getProducts();
    }, [keyword, category])

    return (
        <>
            <View style={{ paddingHorizontal: 16, flex: 1 }}>
                <Gap height={16} />
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}>
               
                    {isLoading ? <ActivityIndicator/> : renderProducts()}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default SearchProductBlock;

const styles = StyleSheet.create({})