import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import App from '../App'
import { useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import AuthAction from '../actions/AuthAction'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    id: "",
    mm_name: "",
    mm_gender: "",
    mm_phone: "",
    mm_prov: 0,
    mm_kelurahan: 0,
    mm_address: "",
    mm_pass: "",
    province: {},
    district: {},
    regency: {},
    village: {}
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
    setUser({
      ...form,
      [field]: value
    })
  }

  const handleSelectProvince = () => {
    navigation.navigate('Select Province', {
      onSelect: (selectedProvince) => {
        handleChangeInput('province', selectedProvince); // Set the province when coming back
      }
    });
  };

  const handleSelectVillage = () => {
    if (province) {
      navigation.navigate('Select Village', {
        provinceId: province.id,
        onSelectVillage: (selectedVillage) => {
          handleChangeInput('village', selectedVillage); // Set the province when coming back
        }
      });
    }
  };

  const getPersonalInfo = async () => {
    setIsLoading(true);
    try {
      const response = await AuthAction.me();
      console.log('response', response);
      setUser(response.me)
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPersonalInfo()
  }, [])

  return (
    <ScreenWrapper>
      <Appbar.Header mode='small'>
        <Appbar.BackAction onPress={() => {
          navigation.goBack();
        }} />
        <Appbar.Content title="Ubah Alamat Kirim" titleStyle={{
          fontWeight: 'bold'
        }} />
      </Appbar.Header>

      <View style={{ paddingHorizontal: 16 }}>
        {
          isLoading
            ? <ActivityIndicator />
            :
            <>

              <TextInput
                    mode="flat"
                    label="Nama"
                    right={<TextInput.Affix text="/15" />}
                    onChangeText={(text) => handleChangeInput('mm_name', text)}
                />
                <Gap height={8} />
              <TextInput
                mode="flat"
                label="Provinsi"
                value={user.province?.name}
                onFocus={handleSelectProvince}
              />
              <Gap height={8} />

              <TextInput
                mode="flat"
                label="Kelurahan/Desa"
                value={user.village?.full_name}
                multiline={true}
                numberOfLines={3}
                onFocus={handleSelectVillage}
              />
              <Gap height={8} />

              <TextInput
                mode="flat"
                label="Alamat"
                onChangeText={(text) => handleChangeInput('mm_address', text)}
                multiline={true}
                numberOfLines={3}
                value={user?.mm_address}
              />
              <Gap height={8} />


              <Gap height={8} />
              <Button mode="contained" loading={isLoading}>Simpan</Button>
              <Gap height={16} />
            </>
        }

      </View>
    </ScreenWrapper>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})