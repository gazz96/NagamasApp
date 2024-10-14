import { StyleSheet, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Appbar, Icon, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../components/ScreenWrapper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthAction from '../actions/AuthAction'


const ProfileGroupScreen = () => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        mm_name: "",
        mm_phone: "",
        mm_role: "subscriber",
        mm_token: ""
    });

    const isFocused = useIsFocused();
    const getToken = async () => {
        setIsLoading(true);
        try {
            const response = await AuthAction.me();
            console.log('response', response);
            setUser(response?.me)
        }
        catch (error) {
            console.log('error', error.request)
        }
        finally {
            setIsLoading(false);
        }
    }

    const userLogout = async() => {
        setIsLoading(true)
        try {
            await AsyncStorage.removeItem('userToken');
            setUser({
                mm_name: "",
                mm_phone: "",
                mm_role: "subscriber",
                mm_token: ""
            })
            navigation.navigate('Profile Group');
        }
        catch(error) {
            
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getToken()
    }, [isFocused])

    if(isLoading)
    {
        return <ActivityIndicator/>
    }

    return (
        <ScreenWrapper>
            <Appbar.Header>
                <Appbar.Content title="Profile" titleStyle={{
                    fontWeight: 'bold'
                }} />
            </Appbar.Header>
            
            {
                user.mm_token ? 
                <View style={{paddingHorizontal: 16}}>
                    <View style={{ backgroundColor: '#ccc', padding: 12, borderRadius: 4 }}>
                        <Text style={{color: '#222', marginBottom: 2, fontWeight: 'bold'}}>{user?.mm_name}</Text>
                        <Text style={{color: '#222'}}>{user?.id}</Text>
                    </View>
                </View> : <></>
            }
            

            <View style={{ paddingLeft: 16, paddingRight: 16 }}>

                {
                    user.mm_token ? 
                        <>
                            {
                                user.mm_role == 'admin' ? 
                                (<>
                                    <TouchableOpacity style={styles.listItem} onPress={() => {
                                        navigation.navigate('Admin Menu')
                                    }}>
                                        <Text>Management</Text>
                                        <Icon source={"arrow-right"} size={18} />
                                    </TouchableOpacity>
                                </>)
                                : 
                                <></>
                            }

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