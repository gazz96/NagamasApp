import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'

const RegisterScreen = () => {
    const navigation = useNavigation();
    return (
        <ScreenWrapper>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Daftar" />
            </Appbar.Header>

            <View style={{paddingLeft: 16, paddingRight: 16}}>
                <TextInput
                    mode="flat"
                    label="Nama"
                    right={<TextInput.Affix text="/15" />}
                    />
                <Gap height={8}/>
                <TextInput
                    mode="flat"
                    label="Alamat"
                    right={<TextInput.Affix text="/15" />}
                    />
                
                <Gap height={8}/>
                <TextInput
                    mode="flat"
                    label="Provinsi"
                    right={<TextInput.Affix text="/15" />}
                    onFocus={() => navigation.navigate('Select Province')}
                    />
                
                <Gap height={8}/>
                <TextInput
                    mode="flat"
                    label="Alamat"
                    right={<TextInput.Affix text="/15" />}
                    />
                
                <Gap height={8}/>
                <TextInput
                    mode="flat"
                    label="Alamat"
                    right={<TextInput.Affix text="/15" />}
                    />
            </View>
        </ScreenWrapper>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})