import { StyleSheet, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { Appbar, Icon, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../components/ScreenWrapper'


const ProfileGroupScreen = () => {
    const navigation = useNavigation();
    return (
        <ScreenWrapper>
            <Appbar.Header>
                <Appbar.Content title="Profile" titleStyle={{
                    fontWeight: 'bold'
                }} />
            </Appbar.Header>
            
            <View style={{ paddingLeft: 16, paddingRight: 15}}>
                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Login')}>
                    <Text>Masuk</Text>
                    <Icon source={"arrow-right"} size={18} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Register')}>
                    <Text>Daftar</Text>
                    <Icon source={"arrow-right"} size={18} />
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

export default ProfileGroupScreen

const styles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc', 
        paddingBottom: 20,
        paddingTop: 20
    }
})