import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput, DataTable } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import FaqAction from '../actions/FaqAction'

const AdminFaqListScreen = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);

    const getFaqData = async() => {
        setLoading(true)
        try {
            const response = await FaqAction.list();
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

    useEffect(() => {
        getFaqData();
    }, [isFocused])

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="FAQ Data" />
                    <Appbar.Action icon="plus" onPress={() => {
                        navigation.navigate('Admin Faq Form');
                    }}/>
                </Appbar.Header>

                
                <View style={{paddingHorizontal: 16}}>

                    <Gap height={12}/>
                    
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>PERTANYAAN</DataTable.Title>
                            <DataTable.Title>JABAWAN</DataTable.Title>
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
                                            <DataTable.Cell>
                                                <View>
                                                    <Text numberOfLines={2}>{row.question}</Text>
                                                </View>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <View>
                                                    <Text numberOfLines={2}>{row.answer}</Text>
                                                </View>
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                <Button onPress={() => {
                                                    navigation.navigate('Admin Faq Form', {
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


export default AdminFaqListScreen