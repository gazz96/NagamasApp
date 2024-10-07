import { StyleSheet, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import { Appbar, Icon, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../components/ScreenWrapper'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ProfileGroupScreen = () => {

    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const getToken = async () => {
        setIsLoading(true);
        try {
            const getUserToken = await AsyncStorage.getItem('userToken');
            console.log('getUserToken', getUserToken);
            setToken(getUserToken);
        }
        catch (error) {

        }
        finally {
            setIsLoading(false);
        }
    }

    const userLogout = async() => {

        setIsLoading(true)
        try {
            await AsyncStorage.removeItem('userToken');
            setToken('')
            navigation.navigate('Profile Group');
        }
        catch(error) {

        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(isFocused) {
            getToken()
        }
       
    }, [token, isFocused])

    const navigation = useNavigation();
    return (
        <ScreenWrapper>
            <Appbar.Header>
                <Appbar.Content title="Profile" titleStyle={{
                    fontWeight: 'bold'
                }} />
            </Appbar.Header>

            <View style={{ paddingLeft: 16, paddingRight: 15 }}>

                {
                    token ? 
                        <>
                            <TouchableOpacity style={styles.listItem} onPress={userLogout}>
                                <Text>Keluar</Text>
                                <Icon source={"arrow-right"} size={18} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Profile')}>
                                <Text>Ubah Alamat Kirim</Text>
                                <Icon source={"arrow-right"} size={18} />
                            </TouchableOpacity>
                        </>
                        : 
                        <>
                            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Login')}>
                                <Text>Masuk</Text>
                                <Icon source={"arrow-right"} size={18} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Register')}>
                                <Text>Daftar</Text>
                                <Icon source={"arrow-right"} size={18} />
                            </TouchableOpacity>
                        </>
                }


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