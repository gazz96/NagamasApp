import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import Gap from '../components/Gap'
import ExpeditionAction from '../actions/ExpeditionAction'
import Toast from 'react-native-toast-message'

const AdminOrderFormScreen = () => {

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
        <SafeAreaView style={{flex: 1 }}>
            <ScreenWrapper style={{backgroundColor: '#eeeeee'}}>
                <Appbar.Header mode='small' style={{backgroundColor: '#fff'}}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Form Order" />
                </Appbar.Header>

                <Gap height={8}/>

                <View style={{backgroundColor: "#ffffff"}}>
                    <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
                        <Text style={{fontWeight: 'bold', color: '#222', fontSize: 16}}>Customer</Text>
                        <Gap height={16}/>

                        <View>
                            <Text style={styles.title}>Email</Text>
                            <Text>Custom@gmail.com</Text>
                        </View>
                        <Gap height={8}/>

                        <View>
                            <Text style={styles.title}>Nama</Text>
                            <Text>Customer</Text>
                        </View>
                        <Gap height={8}/>

                        <View>
                            <Text style={styles.title}>Whatsapp</Text>
                            <Text>087867894423</Text>
                        </View>
                    </View>
                </View>

                <Gap height={8}/>

                <View style={{backgroundColor: "#ffffff"}}>
                    <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
                        <Text style={{fontWeight: 'bold', color: '#222', fontSize: 16}}>Shipping</Text>
                        <Gap height={16}/>

                        <View>
                            <Text style={styles.title}>Provinsi</Text>
                            <Text>Sumatera Utara</Text>
                        </View>
                        <Gap height={12}/>

                        <View>
                            <Text style={styles.title}>Kabupaten/Kota</Text>
                            <Text>Kabupaten/Kota</Text>
                        </View>
                        <Gap height={12}/>

                        <View>
                            <Text style={styles.title}>Kecamatan</Text>
                            <Text>Kecamatan</Text>
                        </View>
                        <Gap height={12}/>

                        <View>
                            <Text style={styles.title}>Kelurahan</Text>
                            <Text>Kelurahan</Text>
                        </View>
                        <Gap height={12}/>

                        <View>
                            <Text style={styles.title}>Alamat</Text>
                            <Text>JL. ILENG KOMP. TAMAN PERMATA HIJAU BLOK. B NO. 13</Text>
                        </View>
                    </View>
                </View>
                
                <Gap height={8}/>
                

                <View style={{paddingHorizontal: 16}}>
                    
                    
                    <Button mode="contained" loading={isLoading} onPress={saveForm}>Simpan</Button>
            
                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {

    },
    cardTitle: {

    },
    title: {
        fontWeight: 'bold', 
        color: '#222', 
        marginBottom: 4
    },

    text: {

    }
})

export default AdminOrderFormScreen;
