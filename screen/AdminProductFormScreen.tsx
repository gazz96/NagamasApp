import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import Gap from '../components/Gap'
import ProductAction from '../actions/ProductAction'
import Toast from 'react-native-toast-message'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const AdminProductFormscreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
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

    const uploadFile = async() => {
        const formData = new FormData();
        
        if(photo){
            formData.append('item_img_location_1', {
                name: photo.fileName,
                type: photo.type,
                uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') :  photo.uri
            });
        }

        const response = await ProductAction.upload(formData);
        return response.data.uploadedFilePath;
    }

    const createFormData = () => {
        const formData = new FormData();   
        for(let f in form)  {
            console.log(f, form[f]);
            formData.append(f, form[f]);
        }
        return formData;
    }

    const saveForm = async () => {
        setLoading(true)
        
        try {
            const form = createFormData();
            const itemImgLocation1 = await uploadFile();
            if(itemImgLocation1) {
                form.append('item_img_location_1', itemImgLocation1);
            }
            const response = await ProductAction.save(form);

            Toast.show({
                type: 'success',
                text1: 'Berhasil disimpan'
            });

        }
        catch (error) {
            if (error.response) {
                console.log('error.esponse', error.response);
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
            setLoading(false);
        }
    }

    const handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        launchImageLibrary(options, response => {
            console.log('response.launchImageLibrary', response)
          if (response?.assets) {
            setPhoto(response?.assets[0]);
          }
        })
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

                    <Gap height={8} />

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 300, height: 300 }}
                        />
                    )}
                    <Button onPress={handleChoosePhoto}>Pilih Gambar</Button>
                </View>

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