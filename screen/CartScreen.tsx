import { StyleSheet, Text, TouchableOpacity, View, Platform, Dimensions  } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { ActivityIndicator, Appbar, Button, Icon, List, TextInput } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import OrderAction from '../actions/OrderAction'
import Rp from '../components/Rp'
import AuthAction from '../actions/AuthAction'
import Toast from 'react-native-toast-message'
import Gap from '../components/Gap'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import SettingAction from '../actions/SettingAction'
import InvalidFormValidation from '../components/InvalidFormValidation'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import ExpeditionAction from '../actions/ExpeditionAction'

const CartScreen = () => {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState([])
  const isFocused = useIsFocused();
  const [note, setNote] = useState("");
  const [user, setUser] = useState({
    id: "",
    mm_name: "",
    mm_gender: "",
    mm_phone: "",
    mm_prov: 0,
    mm_kab_kota: 0,
    mm_kecamatan: 0,
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

  const getCarts = async () => {
    setIsLoading(true)
    try {
      const response = await OrderAction.cart();
      setCarts(response?.data?.items)
    }
    catch (error) {
      console.log('data', error);
      setCarts([])
    }
    finally {
      setIsLoading(false);
    }
  }

  const addToCart = async (productId) => {
    setIsLoading(true)
    try {
      await OrderAction.addToCart(productId);
      await getCarts();

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
      setIsLoading(false);
    }
  }

  const subtractFromCart = async (productId) => {
    setIsLoading(true)
    try {
      await OrderAction.subtractFromCart(productId);
      await getCarts();
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
      setIsLoading(false);
    }
  }

  const getTotal = () => {
    let total = 0;
    carts.map((cart) => {
      total += parseInt(cart.amount);
    })
    return Rp(total);
  }

  const getQty = () => {
    let total = 0;
    carts.map((cart) => {
      total += parseInt(cart.item_qty);
    })
    return total;
  }

  const goToCheckout = async () => {

    const token = await AuthAction.getUserToken();

    if (!token) {
      navigation.navigate('Login');
    }

    if (carts.length >= 1) {
      navigation.navigate('Checkout');
    }
    else {
      Toast.show({
        text1: 'Cart kosong',
        type: 'error',
      })
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

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['90%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const updateShippingInformation = () => {
    try {
      setIsLoading(true);
      bottomSheetModalRef?.current?.close()
    }
    catch (errorr) {

    }
    finally {
      setIsLoading(false);
    }

  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  const checkoutFormData = () => {
    const formData = new FormData();
    formData.append('so_cust_email', user?.id);
    formData.append('so_cust_name', user.mm_name);
    formData.append('so_cust_phone', user.mm_phone);
    formData.append('so_cust_address', user.mm_address);
    formData.append('so_cust_add_prov', user.mm_prov);
    formData.append('so_cust_add_kel', user.mm_kelurahan);
    formData.append('so_ship_id', expedition.id);
    console.log('checkoutFormData', formData);
    return formData;
  }


  const doCheckout = async () => {
    setIsLoading(true)
    try {
      const checkoutResponse = await OrderAction.checkout(checkoutFormData());
      console.log('checkoutResponse', checkoutResponse);
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
        if (error.response.status == 422) {
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


  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)

  const searchRef = useRef(null)

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setIsLoading(true)
    const response = await ExpeditionAction.list({
        s: q,
        postsPerPage: 100
    });
    const suggestions = response.data
      .map(item => ({
        id: item.id,
        title: item.expd_name,
      }))
    setSuggestionsList(suggestions)
    setIsLoading(false)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => { }, [])

  useEffect(() => {
    getCarts()
    getPersonalInfo()
  }, [isFocused])

  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaView style={{ flex: 1 }}>

        <Appbar.Header>
          <Appbar.Content title="Order" titleStyle={{
            fontWeight: 'bold'
          }} />
        </Appbar.Header>
        <BottomSheetModalProvider>
          <ScreenWrapper style={{ flex: 1 }}>

            <View style={{ borderBottomWidth: 1, borderBlockColor: '#eee', paddingBottom: 8 }}>
              <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: '#222', fontWeight: 'bold' }}>Diantar ke</Text>
                  <TouchableOpacity onPress={() => {
                    handlePresentModalPress();
                  }}>
                    <Text style={{ fontSize: 10, color: '#222', fontWeight: 'bold' }}>Ubah Pengiriman</Text>
                  </TouchableOpacity>
                </View>
                <Gap height={8} />
                <View>
                  <Text style={{ fontSize: 12, color: '#222' }}>{user?.mm_name}</Text>
                  <Text style={{ fontSize: 12 }} numberOfLines={1}>{user?.mm_address}</Text>
                  <Text style={{ fontSize: 12 }}>{user?.mm_phone}</Text>
                  {
                    expedition?.expd_name ? <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#222' }}>Kurir {expedition?.expd_name}</Text> : <></>
                  }
                </View>
                <Gap height={8} />
                {/* <TextInput mode='outlined' placeholder='Tambah Catatan atau Instruksi'
                  onChangeText={(text) => setNote(text)}
                  value={note}/> */}
              </View>
            </View>


            <Gap height={8} />
            <View>
              <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                {
                  isLoading ? <ActivityIndicator /> :
                    carts.map((item, index) => {
                      return (
                        <View key={item.item_id} style={{ marginBottom: 16, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <View>
                            <Text>{item.item_name}</Text>
                            <Text style={{ color: '#222', fontWeight: 'bold' }}>{Rp(item.amount)}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#eee', borderRadius: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                              onPress={() => {
                                subtractFromCart(item.item_id)
                              }}>
                              <Text>
                                <Icon source="minus" />
                              </Text>
                            </TouchableOpacity>

                            <TextInput
                              style={{ backgroundColor: '#fff' }}
                              value={(item.item_qty).toString()}
                              keyboardType='numeric'
                              onChangeText={(text) => {
                              }} />

                            <TouchableOpacity style={{ width: 30, height: 30, backgroundColor: '#eee', borderRadius: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                              onPress={() => {
                                addToCart(item.item_id)
                              }}>
                              <Icon source="plus" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    })
                }
              </View>
            </View>


          </ScreenWrapper>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={{
              borderWidth: 1,
              borderColor: '#EEE',
              borderRadius: 16
            }}
          >
            <View style={{ paddingHorizontal: 16 }}>

              <BottomSheetView style={styles.contentContainer}>


                {/* <TextInput
                  mode="flat"
                  label="Kurir"
                  value={expedition?.expd_name}
                  onFocus={handleSelectExpedition}
                /> */}
                <AutocompleteDropdown
                  ref={searchRef}
                  controller={controller => {
                    dropdownController.current = controller
                  }}
                  // initialValue={'1'}
                  direction={Platform.select({ ios: 'down' })}
                  dataSet={suggestionsList}
                  onChangeText={getSuggestions}
                  onSelectItem={item => {
                    item && setSelectedItem(item.id)
                  }}
                  debounce={600}
                  suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                  onClear={onClearPress}
                  //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                  onOpenSuggestionsList={onOpenSuggestionsList}
                  loading={isLoading}
                  useFilter={false} // set false to prevent rerender twice
                  textInputProps={{
                    placeholder: 'Pilih Kurir',
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    style: {
                      borderRadius: 0,
                      backgroundColor: '#fff',
                      color: '#222',
                      paddingLeft: 18,
                    },
                  }}
                  rightButtonsContainerStyle={{
                    right: 8,
                    height: 30,

                    alignSelf: 'center',
                  }}
                  inputContainerStyle={{
                    backgroundColor: '#383b42',
                    borderRadius: 25,
                  }}
                  suggestionsListContainerStyle={{
                    backgroundColor: '#383b42',
                  }}
                  containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                  renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
                  //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
                  //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
                  inputHeight={50}
                  showChevron={false}
                  closeOnBlur={false}
                //  showClear={false}
                />
                <Gap height={8} />

                <TextInput
                  mode="flat"
                  label="Whatsapp"
                  onChangeText={(text) => handleChangeInput('mm_phone', text)}
                  value={user?.mm_phone}
                />
                <Gap height={8} />

                <TextInput
                  mode="flat"
                  label="Nama"
                  onChangeText={(text) => handleChangeInput('mm_name', text)}
                  value={user?.mm_name}
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
                <Button mode='contained' onPress={() => {
                  updateShippingInformation();
                }}>Rubah</Button>
              </BottomSheetView>

            </View>
          </BottomSheetModal>
          <View style={{ paddingHorizontal: 16, position: 'absolute', bottom: 0, height: 50, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' }}>
            <View>
              <Text style={{ fontSize: 10 }}>Total Harga</Text>
              {
                isLoading
                  ? <ActivityIndicator />
                  : <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 12 }}>
                    {
                      getTotal()
                    }
                  </Text>
              }
            </View>

            {
              isLoading
                ? <ActivityIndicator />
                :
                <Button mode="contained" onPress={() => {
                  doCheckout();
                }}>
                  Beli ({getQty()})
                </Button>
            }
          </View>
        </BottomSheetModalProvider>

      </SafeAreaView>
    </AutocompleteDropdownContextProvider>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  contentContainer: {

  }
})