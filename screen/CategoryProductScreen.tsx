import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Searchbar, useTheme } from 'react-native-paper'
import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar'
import ScreenWrapper from '../components/ScreenWrapper'
import ProductListBlock from '../components/ProductListBlock'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import Gap from '../components/Gap'



const CategoryProductScreen = () => {
    const theme = useTheme()
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    const { name } = route.params;
    const [search, setSearch] = useState("")

    useEffect(() => {

    }, [search])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScreenWrapper style={{ flex: 1 }}>
                <Gap height={8}/>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Searchbar
                        placeholder="Cari..."
                        mode="bar"
                        style={{ width: '83%', backgroundColor: '#eee'  }}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </Appbar.Header>
                
                <ProductListBlock name={name} search={search}/>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

export default CategoryProductScreen

const styles = StyleSheet.create({

})