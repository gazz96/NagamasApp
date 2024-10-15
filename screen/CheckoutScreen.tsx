import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Appbar, Button, TextInput } from 'react-native-paper'
import App from '../App'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Gap from '../components/Gap'
import AuthAction from '../actions/AuthAction'
import Toast from 'react-native-toast-message'
import OrderAction from '../actions/OrderAction'
import InvalidFormValidation from '../components/InvalidFormValidation'
import OpenWebUrl from '../components/OpenWebUrl'
import SettingAction from '../actions/SettingAction'
import WhatsappAction from '../actions/WhatsappAction'

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [user, setUser] = useState({
    //id: "",
    mm_name: "",
    mm_gender: "",
    //mm_phone: "",
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

  const [expedition, setExpedition] = useState({
    id: "",
    expd_name: ""
  });

  const handleChangeInput = (field: string, value: string) => {
    setUser({
      ...user,
      [field]: value
    })
  }

  const handleSelectProvince = () => {
    navigation.navigate('Select Checkout Province', {
      onSelect: (selectedProvince) => {
        handleChangeInput('province', selectedProvince); // Set the province when coming back
      }
    });
  };

  const handleSelectVillage = () => {
    if (province) {
      navigation.navigate('Select Checkout Village', {
        provinceId: province.id,
        onSelectVillage: (selectedVillage) => {
          handleChangeInput('village', selectedVillage); // Set the village when coming back
        }
      });
    }
  };

  const handleSelectExpedition = () => {
    if (expedition) {
      navigation.navigate('Select Checkout Expedition', {
        expeditionId: expedition.id,
        onSelectExpedition: (selectedExpedition) => {
          setExpedition(selectedExpedition)
          //handleChangeInput('expedition', selectedExpedition); // Set the expedition when coming back
        }
      });
    }
  };

  const isCartExist = async() => {
    setIsLoading(true);
    try {
      const response = await OrderAction.isCartExist();
      if(!response.data.carts) {
        navigation.navigate('Cart');
      }
    }
    catch(error) {

    }
    finally {
      setIsLoading(false);
    }
  }

  const getPersonalInfo = async () => {
    setIsLoading(true);
    try {
      const response = await AuthAction.me();
      setUser(response.me)
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const doCheckout = async () => {
    setIsLoading(true)
    try {
    
      const updateProfileResponse = await AuthAction.updateProfile(profileFormData());
      const checkoutResponse = await OrderAction.checkout(checkoutFormData());
      const settingResponse = await SettingAction.list();
      Toast.show({
        text1: 'Berhasil melakukan checkout'
      })

      setExpedition({
        id: "",
        expd_name: ""
      })

      navigation.navigate('Tab.Home')

    }
    catch (error) {
        console.log('error', error.response);
      if (error.response) {
        if(error.response.status == 422) {
          console.log('errors data', error?.response.data);
          InvalidFormValidation(error?.response?.data?.errors ?? []);
        }
      } else if (error.request) {
        Toast.show({
          text1: 'Internal Request Problem',
          type: 'warning'
        })
      } else {
        console.log('error.message');
        Toast.show({
          text1: 'Something Wrong',
          type: 'danger'
        })
      }
    }
    finally {
      setIsLoading(false);
    }
  }


  const profileFormData = () => {
      const formData = new FormData();
      formData.append('mm_name', user.mm_name);
      formData.append('mm_prov', user.province?.id);
      formData.append('mm_kelurahan', user.village?.id);
      formData.append('mm_address', user.mm_address);
      formData.append('mm_pass', user.mm_pass);
      return formData;
  }

  const checkoutFormData = () => {
    const formData = new FormData();
    formData.append('so_ship_id', expedition.id);
    return formData;
  }

  useEffect(() => {
    isCartExist()
    getPersonalInfo()
  }, [])

  return (
    <ScreenWrapper>
      <Appbar.Header mode='small'>
        <Appbar.BackAction onPress={() => {
          navigation.goBack();
        }} />
        <Appbar.Content title="Ubah Alamat Kirim" />
      </Appbar.Header>

      <View style={{ paddingHorizontal: 16 }}>
        {
          isLoading
            ? <ActivityIndicator />
            :
            <>
              <TextInput
                mode="flat"
                label="Kurir"
                value={expedition?.expd_name}
                onFocus={handleSelectExpedition}
              />
              <Gap height={8} />

              <TextInput
                mode="flat"
                label="Nama"
                onChangeText={(text) => handleChangeInput('mm_name', text)}
                value={user.mm_name}
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

              <Button mode="contained" onPress={doCheckout} loading={isLoading}>Simpan</Button>
              <Gap height={16} />
            </>
        }

      </View>
    </ScreenWrapper>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({})