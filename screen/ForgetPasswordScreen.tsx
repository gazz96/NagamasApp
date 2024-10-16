import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Appbar, TextInput, Button } from 'react-native-paper'
import App from '../App'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../components/ScreenWrapper'
import Gap from '../components/Gap'
import AuthAction from '../actions/AuthAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import InvalidFormValidation from '../components/InvalidFormValidation'
import Splash from '../components/Splash'


const ForgetPasswordScreen = () => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        mm_email: "",
        mm_pass: "",
    });

    const handleChangeInput = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const resetPassword = async () => {
    
       
        
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('mm_email', form.mm_email);
            const response = await AuthAction.resetPassword(formData);
            console.log('response', response);
            Toast.show({
                type: 'success',
                text1: 'Reset password berhasil',
                text2: 'Perika email anda'
            });

        }
        catch (error: any) {
            console.log('form', form);
            if (error.response) {
               
                console.log('error.esponse');
                console.log(error.response.data);
                console.log(error.response.status);
                
                if(error?.response?.status == 422) {
                    InvalidFormValidation(error.response.data.errors);
                }

                if(error?.response?.status == 400) {
                    Toast.show({
                        type: 'error',
                        text1: error.response.data.message
                    })
                }

            } else if (error.request) {
                console.log('error.request');
                console.log(error.request);
            } else {
                console.log('error.message');
                console.log('Error', error.message);
            }
        }
        finally {
            setIsLoading(false)
        }
        
    }

    if(isLoading) {
        return <Splash/>
    }


    return (
        <ScreenWrapper>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Pemulihan Akun" />
            </Appbar.Header>

            <View style={{paddingLeft: 16, paddingRight: 16 }}>
                <TextInput
                    mode="flat"
                    label="Email"
                    placeholder="Contoh: john.doe@gmail.com"
                    onChangeText={(text) => handleChangeInput('mm_email', text)}
                    value={form.mm_email}
                    />

                <Gap height={8}/>
                <Button mode="contained" onPress={resetPassword}>
                    Kirim Password
                </Button>

                <Gap height={12}/>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    navigation.navigate('Login')
                }}>
                    <Text style={{color: '#222'}}>Login ke akun</Text>
                </TouchableOpacity>

            </View>
        </ScreenWrapper>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({})