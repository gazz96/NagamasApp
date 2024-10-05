import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import Gap from '../components/Gap'
import ExpeditionAction from '../actions/ExpeditionAction'
import Toast from 'react-native-toast-message'

const AdminExpeditionFormScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { row } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [form, setForm] = useState({
        id: "",
        name: ""
    })

    const handleInput = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        });
    }

    const fillFormValue = () => {
        if(row) {
            setForm({
                id: row.id,
                name: row.expd_name
            })
        }
    }

    const saveForm = async() => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('id', form.id);
            formData.append('expd_name', form.name);
            const response = await ExpeditionAction.save(formData);
            console.log('response', response);
            Toast.show({
                type: 'success',
                text1: 'Berhasil disimpan'
            });
        }
        catch(error) {
            console.log('error', error.response)
        }
        finally {
            setLoading(false);
        }
    }
    


    useEffect(() => {
        fillFormValue();
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Form Expedition" />
                </Appbar.Header>

                <View style={{paddingHorizontal: 16}}>
                    <TextInput
                        label="ID"
                        value={form.id}
                        onChangeText={(text) => handleInput('id', text)}/>
                    
                    <Gap height={8}/>

                    <TextInput
                        label="NAMA EXPEDISI"
                        value={form.name}
                        onChangeText={(text) => handleInput('name', text)}/>
                    <Gap height={12}/>
                    <Button mode="contained" loading={isLoading} onPress={saveForm}>Simpan</Button>
            
                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default AdminExpeditionFormScreen;