import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const AdminMenuScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="MANAGEMENT" />
                </Appbar.Header>

                <View style={{ paddingHorizontal: 16 }}>
                    <List.Section>

                        <List.Item title="Order"
                            left={() => <List.Icon icon="folder" />}
                            onPress={() => {
                                navigation.navigate('Admin Order List');
                            }} />

                        <List.Item title="Expedition"
                            left={() => <List.Icon icon="folder" />}
                            onPress={() => {
                                navigation.navigate('Admin Expedition List');
                            }} />

                        <List.Item title="Product"
                            left={() => <List.Icon icon="folder" />}
                            onPress={() => {
                                navigation.navigate('Admin Product List');
                            }} />

                        <List.Item title="FAQ"
                            left={() => <List.Icon icon="folder" />}
                            onPress={() => {
                                navigation.navigate('Admin Faq List');
                            }} />

                        <List.Item title="Rekap"
                            left={() => <List.Icon icon="folder" />}
                            onPress={() => {
                                navigation.navigate('Admin Faq List');
                            }} />

                       

                    </List.Section>


                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

export default AdminMenuScreen

const styles = StyleSheet.create({})