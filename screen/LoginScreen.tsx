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


const LoginScreen = () => {

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

    const loginUser = async () => {
    
        setIsLoading(true);
        
        try {
            console.log('formData', form);
            const formData = new FormData();
            formData.append('mm_email', form.mm_email);
            formData.append('mm_pass', form.mm_pass);
            const response = await AuthAction.login(formData);
            //const response = await AuthAction.login(form);
            await AsyncStorage.setItem('userToken', response.data.token);
            Toast.show({
                type: 'success',
                text1: 'Berhasil masuk'
            });

            navigation.navigate('Profile Group');
        }
        catch (error: any) {
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


    return (
        <ScreenWrapper>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Masuk" />
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
                <TextInput
                    mode="flat"
                    label="Password"
                    placeholder="Masukan Password"
                    onChangeText={(text) => handleChangeInput('mm_pass', text)}
                    value={form.mm_pass}
                    secureTextEntry={true}
                    />
                <Gap height={8}/>
                <Button mode="contained" onPress={loginUser}>
                    Masuk
                </Button>

                <Gap height={12}/>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    navigation.navigate('Forget Password')
                }}>
                    <Text style={{color: '#222'}}>Lupa Kata Sandi ? </Text>
                </TouchableOpacity>

            </View>
        </ScreenWrapper>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})