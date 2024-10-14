import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ScreenWrapper from '../components/ScreenWrapper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Appbar, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Gap from '../components/Gap'
import Rp from '../components/Rp'

const AdminOrderDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [row, setRows] = useState({});

  useEffect(() => {
    if (route.params?.order) {
      setRows(route.params?.order);
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScreenWrapper style={{ flex: 1 }}>
        <Appbar.Header mode='center-aligned'>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Detail Penjualan" titleStyle={{ fontWeight: 'bold' }} />
        </Appbar.Header>

        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ borderRadius: 4, borderWidth: 1, borderColor: '#ededed', paddingHorizontal: 16 }}>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>No. Order</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{row?.so_id}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Penerima</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{(row?.so_cust_name)}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Whatsapp</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{(row?.so_cust_phone)}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Alamat Pengiriman</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{row?.so_cust_address}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Biaya Admin</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{Rp(row?.so_admin_fee)}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Asuransi</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{Rp(row?.so_ship_insur_value)}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Biaya Pengiriman</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{Rp(row?.so_ship_fee)}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Total</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{Rp(row?.total_amount)}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Bukti Bayar</Text>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{Rp(row?.so_transfer_amount)}</Text>
                <Text style={{ fontSize: 15, paddingTop: 3, color: '#222' }}>{row?.so_bank_name} {row?.so_account_name}</Text>
                <Text style={{ fontSize: 12, paddingTop: 3, color: '#222' }}>{row?.so_date}</Text>
                <Text style={{ fontSize: 12, paddingTop: 3, color: '#222' }}>{row?.so_transfer_notes}</Text>
              </View>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Tanggal Order</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{(row?.so_date)}</Text>
            </View>

            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
              <Text>Status</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, paddingTop: 3, color: '#222' }}>{(row?.so_status)}</Text>
            </View>


          </View>
        </View>
        <Gap height={16}/>
      </ScreenWrapper>
      <View style={{borderWidth: 1, borderColor: '#ededed', paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff'}}>
        <Button mode="contained" onPress={() => {
          navigation.navigate('Main Home', {
            screen: 'Tab.Home'
          });
        }}>Kembali ke Homepage</Button>
      </View>
    </SafeAreaView>
  )
}

export default AdminOrderDetailScreen

const styles = StyleSheet.create({})