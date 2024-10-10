import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, TextInput, Button, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import AuthAction from '../actions/AuthAction'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InvalidFormValidation from '../components/InvalidFormValidation'

const RegisterScreen = () => {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        id: "",
        mm_name: "",
        mm_gender: "",
        mm_phone: "",
        mm_prov: 0,
        mm_kelurahan: 0,
        mm_address: "",
        mm_pass: "",
        mm_confirm_pass: ""
    });

    const [province, setProvince] = useState({
        id: "",
        name: ""
    });

    const [village, setVillage] = useState({
        id: "",
        name: "",
        full_name: ""
    });

    const handleChangeInput = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSelectProvince = () => {
        navigation.navigate('Select Province', {
            onSelect: (selectedProvince) => {
                setProvince(selectedProvince); // Set the province when coming back
            }
        });
    };

    const handleSelectVillage = () => {
        if (province) {
            navigation.navigate('Select Village', {
                provinceId: province.id,
                onSelectVillage: (selectedVillage) => {
                    setVillage(selectedVillage); // Set the province when coming back
                }
            });
        }
    };

    const registerNewUser = async () => {
        
        setIsLoading(true);
        
        handleChangeInput('mm_prov', province.id);
        handleChangeInput('mm_kelurahan', village.id);

        try {
            const formData = new FormData();
            formData.append('id', form.id);
            formData.append('mm_name', form.mm_name);
            formData.append('mm_phone', form.mm_phone);
            formData.append('mm_prov', province.id);
            formData.append('mm_kelurahan', village.id);
            formData.append('mm_address', form.mm_address);
            formData.append('mm_pass', form.mm_pass);
            formData.append('mm_confirm_pass', form.mm_confirm_pass);
            const response = await AuthAction.registerUser(formData);

            console.log('response', response);
            if(response?.data?.token) {
                AsyncStorage.setItem('userToken', response.data.token);
                Toast.show({
                    type: 'success',
                    text1: 'Berhasil mendaftar'
                });
                navigation.navigate('Profile Group');
            }
            
        }
        catch (error: any) {
            if (error.response) {

                if(error.response.status == 422) {
                    InvalidFormValidation(error?.response?.data?.errors ?? []);
                }
               
                console.log('error.esponse');
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
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
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Daftar" />
            </Appbar.Header>

            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                <TextInput
                    mode="flat"
                    label="Nama"
                    right={<TextInput.Affix text="/15" />}
                    onChangeText={(text) => handleChangeInput('mm_name', text)}
                />
                <Gap height={8} />

                <TextInput
                    mode="flat"
                    label="Email"
                    right={<TextInput.Affix text="/15" />}
                    onChangeText={(text) => handleChangeInput('id', text)}
                />
                <Gap height={8} />

                <TextInput
                    mode="flat"
                    label="Nomor Whatsapp"
                    right={<TextInput.Affix text="/15" />}
                    onChangeText={(text) => handleChangeInput('mm_phone', text)}
                />
                <Gap height={8} />

                <TextInput
                    mode="flat"
                    label="Provinsi"
                    value={province.name}
                    onFocus={handleSelectProvince}
                />
                <Gap height={8} />

                <TextInput
                    mode="flat"
                    label="Kelurahan/Desa"
                    value={village?.full_name}
                    multiline={true}
                    numberOfLines={3}
                    onFocus={handleSelectVillage}
                />
                <Gap height={8} />

                <TextInput
                    mode="flat"
                    label="Alamat"
                    right={<TextInput.Affix text="/15" />}
                    onChangeText={(text) => handleChangeInput('mm_address', text)}
                    multiline={true}
                    numberOfLines={3}
                />
                <Gap height={8} />

                <TextInput
                    mode="flat"
                    label="Kata Sandi"
                    onChangeText={(text) => handleChangeInput('mm_pass', text)}
                    value={form.mm_pass}
                    secureTextEntry={false}
                />
                <Gap height={8} />

                <TextInput
                    mode="flat"
                    label="Konfirmasi Kata Sandi"
                    onChangeText={(text) => handleChangeInput('mm_confirm_pass', text)}
                    value={form.mm_confirm_pass}
                    secureTextEntry={false} 
                />
                <Gap height={8} />

                <Button mode="contained" onPress={registerNewUser} loading={isLoading}>Daftar</Button>
                <Gap height={16} />
            </View>
        </ScreenWrapper>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})