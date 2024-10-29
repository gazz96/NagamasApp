import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import App from '../App'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import AuthAction from '../actions/AuthAction'
import Toast from 'react-native-toast-message'
import InvalidFormValidation from '../components/InvalidFormValidation'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [user, setUser] = useState({
    //id: "",
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
      ...user,
      [field]: value
    })
  }

  const handleSelectProvince = () => {
    navigation.navigate('Select Province', {
      onSelect: (selectedProvince) => {
        console.log('selectedProvince', selectedProvince);
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

  const updateProfile = async () => {
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append('mm_name', user.mm_name);
      formData.append('mm_prov', user.province?.id);
      formData.append('mm_kelurahan', user.village?.id);
      formData.append('mm_address', user.mm_address);
      formData.append('mm_pass', user.mm_pass);
      formData.append('mm_phone', user.mm_phone) 
      console.log('formData', formData);
      const response = await AuthAction.updateProfile(formData);
      await getPersonalInfo();

      console.log('updateProfile.response', response);
      Toast.show({
        text1: 'Berhasil disimpan'
      })

    }
    catch (error) {
      if (error.response) {
        console.log('error.esponse');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        InvalidFormValidation(error.response.data.errors);
      } else if (error.request) {
        console.log('error.request');
        console.log(error.request);
      } else {
        console.log('error.message');
        console.log('Error', error.message);
      }
    }
    finally {
      setIsLoading(false);
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
        <Appbar.Content title="Ubah Profile" titleStyle={{
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
                onChangeText={(text) => handleChangeInput('mm_name', text)}
                value={user.mm_name}
              />
              <Gap height={8} />

              <TextInput
                mode="flat"
                label="Nomor WA"
                value={user?.mm_phone}
                onChangeText={(text) => handleChangeInput('mm_phone', text)}
              />
              <Gap height={8} />

              {/* <TextInput
                mode="flat"
                label="Provinsi"
                value={user.province?.name}
                onFocus={handleSelectProvince}
              />
              <Gap height={8} /> */}

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
                label="Alamat (Jalan/Nomor. Rumah-Kode/Pos)"
                onChangeText={(text) => handleChangeInput('mm_address', text)}
                multiline={true}
                numberOfLines={3}
                value={user?.mm_address}
              />
              <Gap height={8} />

              <TextInput
                mode="flat"
                label="Password"
                onChangeText={(text) => handleChangeInput('mm_pass', text)}
                value={user?.mm_pass}
              />
              <Gap height={8} />

              <Button mode="contained" onPress={updateProfile} loading={isLoading}>Simpan</Button>
              <Gap height={16} />
            </>
        }

      </View>
    </ScreenWrapper>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})