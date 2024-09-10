import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, TextInput, Button } from 'react-native-paper'
import App from '../App'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../components/ScreenWrapper'
import Gap from '../components/Gap'

const LoginScreen = () => {
    const navigation = useNavigation();
    return (
        <ScreenWrapper>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Masuk" />
            </Appbar.Header>

            <View style={{paddingLeft: 16, paddingRight: 16 }}>
                <TextInput
                    mode="flat"
                    label="Nomor Whatsapp"
                    placeholder="Contoh: 81234567890"
                    right={<TextInput.Affix text="/15" />}
                    />
                <Gap height={8}/>
                <TextInput
                    mode="flat"
                    label="Password"
                    placeholder="Masukan Password"
                    />
                <Gap height={8}/>
                <Button mode="contained" onPress={() => console.log('Pressed')}>
                    Masuk
                </Button>
            </View>
        </ScreenWrapper>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})