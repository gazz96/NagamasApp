import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput, DataTable } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import ExpeditionAction from '../actions/ExpeditionAction'

const AdminExpeditionListScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const getExpeditionData = async() => {
        setLoading(true)
        try {
            const response = await ExpeditionAction.list();
            console.log('response', response);
            setRows(response);
        }
        catch(error) {
            console.log('error', error)
        }
        finally {
            setLoading(false);
        }
    }

    const refreshPage = () => {
        getExpeditionData();
    }

    useEffect(() => {
        if(isFocused) 
        {
            getExpeditionData();
        }
    }, [isFocused])

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Expedition Data" />
                    <Appbar.Action icon="plus" onPress={() => {
                        navigation.navigate('Admin Expedition Form');
                    }}/>
                </Appbar.Header>

                
                <View style={{paddingHorizontal: 16}}>

                    <Gap height={12}/>
                    
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>ID</DataTable.Title>
                            <DataTable.Title>EKSPEDISI</DataTable.Title>
                            <DataTable.Title>AKSI</DataTable.Title>
                        </DataTable.Header>
                        {
                            isLoading ? 
                            (
                                <DataTable.Row>
                                    <DataTable.Cell>DATA TIDAK ADA</DataTable.Cell>
                                </DataTable.Row>
                            )
                            : 
                            (
                                (rows.data).map((row, index) => {
                                    return (
                                        <DataTable.Row key={row.id}>
                                            <DataTable.Cell>{row.id}</DataTable.Cell>
                                            <DataTable.Cell>{row.expd_name}</DataTable.Cell>
                                            <DataTable.Cell>
                                                <Button onPress={() => {
                                                    navigation.navigate('Admin Expedition Form', {
                                                        row: row
                                                    })
                                                }}>
                                                    Edit
                                                </Button>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                })
                                
                            )
                        }
                        
                    </DataTable>
                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})


export default AdminExpeditionListScreen