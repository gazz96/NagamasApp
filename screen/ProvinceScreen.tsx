import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Searchbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ProvinceScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <ScreenWrapper>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Pilih Provinsi" />
            </Appbar.Header>


            <View style={{paddingLeft: 16, paddingRight: 16}}>
                <Searchbar
                    placeholder="Cari..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>
        </ScreenWrapper>
    )
}

export default ProvinceScreen

const styles = StyleSheet.create({})