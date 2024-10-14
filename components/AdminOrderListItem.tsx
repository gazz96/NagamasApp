import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Gap from './Gap'
import OpenWebUrl from './OpenWebUrl'
import BaseUrl from '../actions/BaseUrl'
import { Button } from 'react-native-paper'

const AdminOrderListItem = ({ row, editOrder }) => {
    return (
        <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomColor: '#ccc', borderBottomWidth: 1 }} key={row.so_id}>

            <View>
                <Text>Customer</Text>
                <Text style={{ fontWeight: 'bold' }}>{row.so_cust_email}</Text>
            </View>
            <Gap height={8} />
            <View>
                <Text>Shipping</Text>
                <Text style={{ fontWeight: 'bold' }}>{row.shipping_address ?? '-'}</Text>
            </View>


            <Gap height={8} />
            <View>
                <Text>Jumlah Item</Text>
                <Text style={{ fontWeight: 'bold' }}>{row.count_items}</Text>
            </View>

            <Gap height={8} />
            <View>
                <Text>Total</Text>
                <Text style={{ fontWeight: 'bold' }}>{Rp(row.total_amount)}</Text>
            </View>


            <Gap height={8} />
            <View style={{ flexDirection: 'row' }}>

                {
                    row.so_status == "Order"
                        ?
                        <>
                            <Button mode='contained' onPress={() => {
                                OpenWebUrl(BaseUrl('invoice/' + row.so_id))
                            }} style={{ marginRight: 8 }}>Invoice</Button>

                            <Button mode='contained' onPress={() => {
                                editOrder(row)
                            }}>Edit</Button></>
                        : <></>
                }

            </View>
        </View>
    )
}

export default AdminOrderListItem

const styles = StyleSheet.create({})