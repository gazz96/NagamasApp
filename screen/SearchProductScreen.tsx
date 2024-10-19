import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Button, Searchbar } from 'react-native-paper'
import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar'
import ScreenWrapper from '../components/ScreenWrapper'
import ProductListBlock from '../components/ProductListBlock'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import Gap from '../components/Gap'
import SearchProductBlock from '../components/SearchProductBlock'
import { ScrollView } from 'react-native-gesture-handler'
import ProductAction from '../actions/ProductAction'
import Splash from '../components/Splash'


const SearchProductScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCategories = async () => {
        setIsLoading(true);
        try {
            const response = await ProductAction.categories();
            console.log('response', response);
            setCategories(response?.data?.categories ?? []);
        }
        catch (error) {
            console.log('error', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategories()
    }, [search, category])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScreenWrapper style={{ flex: 1 }}>
                <Gap height={8} />
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Searchbar
                        placeholder="Search"
                        mode="bar"
                        style={{ width: '83%' }}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        onSubmitEditing={() => {

                        }}
                    />
                </Appbar.Header>

                <Gap height={8} />


                <View style={{ paddingHorizontal: 16 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            categories.map((value, index) => (
                                <Button
                                    mode={category == value ? 'contained' : 'outlined'}
                                    key={value}
                                    style={{ marginRight: 8 }}
                                    onPress={() => {
                                        setCategory(value)
                                    }}>{value}</Button>
                            ))
                        }
                    </ScrollView>
                </View>


                <SearchProductBlock
                    keyword={search}
                    category={category} />

            </ScreenWrapper>
        </SafeAreaView>
    )
}

export default SearchProductScreen

const styles = StyleSheet.create({

})