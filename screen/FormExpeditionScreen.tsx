import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Button, PaperProvider, Portal, Modal, TextInput } from 'react-native-paper'
import Gap from '../components/Gap'
import { useNavigation } from '@react-navigation/native'
import ExpeditionAction from '../actions/ExpeditionAction'
import InvalidFormValidation from '../components/InvalidFormValidation'

const FormExpeditionScreen = () => {

    const [form, setForm] = useState({
        id: "",
        name: ""
    });

    const handleInputChange = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const save = async() => {
        try {
            const response = await ExpeditionAction.save(form);
            console.log('response', response);
        }
        catch(error) {
            
            if (error.response) {

                if(error.response.status == 422) {
                    InvalidFormValidation(error?.response?.data?.errors ?? []);
                }
               
            }
        }
        finally {

        }
    }

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenWrapper style={{ flex: 1 }}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => { 
                        navigation.goBack();
                    }} />
                    <Appbar.Content title="Form Expedisi" titleStyle={{
                        fontWeight: 'bold'
                    }} />
                </Appbar.Header>

                <View style={{ paddingHorizontal: 16, flex: 1 }}>

                    <TextInput
                        label="ID"
                        value={form.id}
                        onChangeText={(text) => handleInputChange('id', text)}
                    />

                    <Gap height={8}/>

                    <TextInput
                        label="NAMA EKSPEDISI"
                        value={form.name}
                        onChange={(text) => handleInputChange('name', text)}
                    />

                    <Gap height={12}/>

                    <Button mode="contained" onPress={save}>
                        Simpan
                    </Button>
                </View>
            </ScreenWrapper>

        </SafeAreaView>

    )
}

export default FormExpeditionScreen

const styles = StyleSheet.create({})