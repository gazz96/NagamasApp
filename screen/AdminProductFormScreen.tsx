import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import Gap from '../components/Gap'
import ProductAction from '../actions/ProductAction'
import Toast from 'react-native-toast-message'

const AdminProductFormscreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [isLoading, setLoading] = useState(false);
    const [form, setForm] = useState({
        id: "",
        item_name: "",
        item_category: "",
        item_category_index: "",
        item_price_sell: "",
        item_um: "",
        item_weight: "",
        item_weight_um: "",
        item_avl_qty: "",
        item_description: "",
        // item_img_location_1: "",
        // item_img_location_2: "",
        // item_img_location_3: ""
    })

    const handleInput = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        });
    }

    const fillFormValue = () => {
        if (route.params?.row) {
            let row = route.params.row;
            console.log('row', row);
            setForm(row)
        }
    }

    const saveForm = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            for(let f in form)  {
                formData.append(f, form[f]);
            }
            const response = await ProductAction.save(formData);
            console.log('response', response);
            Toast.show({
                type: 'success',
                text1: 'Berhasil disimpan'
            });
        }
        catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('error.esponse');
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log('error.request');
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                console.log('error.message');
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
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
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenWrapper>
                <Appbar.Header mode='small'>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Form Product" />
                </Appbar.Header>

                <View style={{ paddingHorizontal: 16 }}>
                    <TextInput
                        label="ID"
                        value={form.id}
                        onChangeText={(text) => handleInput('id', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="NAMA ITEM"
                        value={form.item_name}
                        onChangeText={(text) => handleInput('item_name', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="KATEGORI"
                        value={form.item_category}
                        onChangeText={(text) => handleInput('item_category', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="HARGA"
                        value={form.item_price_sell}
                        onChangeText={(text) => handleInput('item_price_sell', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="SATUAN"
                        value={form.item_um}
                        onChangeText={(text) => handleInput('item_um', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="BERAT"
                        value={form.item_weight}
                        onChangeText={(text) => handleInput('item_weight', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="SATUAN BERAT"
                        value={form.item_weight_um}
                        onChangeText={(text) => handleInput('item_weight_um', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="STOK" 
                        value={form.item_avl_qty}
                        onChangeText={(text) => handleInput('item_avl_qty', text)} />

                    <Gap height={8} />

                    <TextInput
                        label="DESKRIPSI"
                        value={form.item_description}
                        multiline={true}
                        onChangeText={(text) => handleInput('item_description', text)} />


                    <Gap height={12}/>
                    <Button mode="contained" loading={isLoading} onPress={saveForm}>Simpan</Button>
                    <Gap height={24}/>

                </View>
            </ScreenWrapper>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default AdminProductFormscreen;