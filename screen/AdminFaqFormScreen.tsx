import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import Gap from '../components/Gap'
import FaqAction from '../actions/FaqAction'
import Toast from 'react-native-toast-message'
import InvalidFormValidation from '../components/InvalidFormValidation'

const AdminFaqFormScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [isLoading, setLoading] = useState(false);
    const [form, setForm] = useState({
        question: "",
        answer: ""
    })

    const handleInput = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        });
    }

    const fillFormValue = () => {
        if(route.params?.row) {
            let row = route.params?.row
            setForm({
                question: row.question,
                answer: row.answer
            })
        }
    }

    const saveForm = async() => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('question', form.question);
            formData.append('answer', form.answer);

            if(route.params?.row){
                formData.append('id', route.params?.row.id);
            }

            const response = await FaqAction.save(formData);
            console.log('response', response);
            Toast.show({
                type: 'success',
                text1: 'Berhasil disimpan'
            });

            navigation.navigate('Admin Faq List');
        }
        catch(error) {
            console.log('error', error)
            if (error.response) {

                if(error.response.status == 422) {
                    InvalidFormValidation(error?.response?.data?.errors ?? []);
                }
               
            }
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
                    <Appbar.Content title="Form Faq" />
                </Appbar.Header>

                <View style={{paddingHorizontal: 16}}>
                    <TextInput
                        label="PERTANYAAN"
                        value={form.question}
                        onChangeText={(text) => handleInput('question', text)}/>
                    
                    <Gap height={8}/>

                    <TextInput
                        label="JAWABAN"
                        value={form.answer}
                        onChangeText={(text) => handleInput('answer', text)}
                        multiline={true}
                        numberOfLines={3}/>
                    <Gap height={12}/>
                    <Button mode="contained" loading={isLoading} onPress={saveForm}>Simpan</Button>
            
                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default AdminFaqFormScreen;