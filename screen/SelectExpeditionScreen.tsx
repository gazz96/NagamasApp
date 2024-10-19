import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { ActivityIndicator, Appbar, List, Searchbar } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import WilayahAction from '../actions/WilayahAction'
import Gap from '../components/Gap'
import ExpeditionAction from '../actions/ExpeditionAction'


const SelectExpeditionScreen = () => {

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();

    const getExpeditions = async () => {
        setIsLoading(true);
        try {
            const response = await ExpeditionAction.list({
                s: searchQuery,
                postsPerPage: 100
            });
            setRows(response?.data);
        }
        catch(error) {
            console.log('error', error);
            if (error.response) {
                if(error.response.status == 422) {
                  console.log('errors data', error?.response.data ?? []);
                  InvalidFormValidation(error?.response?.data?.errors ?? []);
                }
              } else if (error.request) {
                Toast.show({
                  text1: 'Internal Request Problem',
                  type: 'warning'
                })
              } else {
                console.log('error.message');
                Toast.show({
                  text1: 'Something Wrong',
                  type: 'danger'
                })
              }
            
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleExpeditionSelect = (expedition) => {
        if (route.params?.onSelectExpedition) {
            route.params.onSelectExpedition(expedition);
        }
        navigation.goBack();  // Go back to Register screen
    };

    useEffect(() => {
        getExpeditions();
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
                                <List.Item title={row.expd_name} key={row.id} onPress={() => handleExpeditionSelect(row)}/>
                            )
                        })
                }
                </List.Section>

            </View>
        </ScreenWrapper>
    )
}

export default SelectExpeditionScreen

const styles = StyleSheet.create({})