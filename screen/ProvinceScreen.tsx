import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { ActivityIndicator, Appbar, List, Searchbar } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import WilayahAction from '../actions/WilayahAction'
import Gap from '../components/Gap'


const ProvinceScreen = () => {

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();

    const getProvinces = async () => {
        setIsLoading(true);
        try {
            const response = await WilayahAction.getProvince({
                s: searchQuery
            });
            setRows(response);
        }
        catch(error) {
            console.log('error', error);
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleProvinceSelect = (province) => {
        // Pass the selected province back to RegisterScreen
        if (route.params?.onSelect) {
            route.params.onSelect(province);
        }
        navigation.goBack();  // Go back to Register screen
    };

    useEffect(() => {
        getProvinces();
    }, [searchQuery])

    return (
        <ScreenWrapper>
            <Gap height={8}/>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={
                    <Searchbar
                        placeholder="Cari..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                } />
            </Appbar.Header>


            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                

                <List.Section>
                {
                    isLoading ? <ActivityIndicator/> :
                        rows.map((row, index) => {
                            return (
                                <List.Item title={row.name} key={row.id} onPress={() => handleProvinceSelect(row)}/>
                            )
                        })
                }
                </List.Section>

            </View>
        </ScreenWrapper>
    )
}

export default ProvinceScreen

const styles = StyleSheet.create({})