import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, List } from 'react-native-paper'

const HelpScreen = () => {

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenWrapper>
        <Appbar.Header>
          <Appbar.Content title="Help" titleStyle={{
            fontWeight: 'bold'
          }} />
        </Appbar.Header>
        
        <View style={{paddingHorizontal: 16}}>
          <View style={styles.listItem}>
            <Text style={styles.title}>1. Mengapa beli loga mulia disini ?</Text>
            <Text style={styles.description}>Belanja logam mulaidisni produk dijamin pasti produk ASLI, harga termurah, pengiriman tepat waktu, aman dan berasuransi.</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.title}>2. Apakah produk yang dijual disini jaminan asli, bagaimana cara mengeceknya ?</Text>
            <Text style={styles.description}>
              Produk StarGold dijamin pasti ASLI, untuk cara pengecekannya keasliannya dapat menggunakan cara sebagai berikut: 

              ANTAM = Untuk mengecek keaslian produk ANTAM Logam Mulia bisa menggunakan aplikasi Certieye
            </Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.title}>3. Apakah produk yang dijual disini bisaa dijual lagi ?</Text>
            <Text style={styles.description}>
              Tentu bisa, produk produk kami bisa dijual kembali kepada kami atau ke toko - toko emas lainnya. Namun jika dijual di toko emas lainnya itu tergantung dari kebijakan dan ketentuan toko emas tersebut.
            </Text>
          </View>
        </View>

      </ScreenWrapper>
    </SafeAreaView>
  )
}

export default HelpScreen

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 24,
  },
  title: {fontWeight: 'bold', color: '#222', marginBottom: 8},
  description: {

  }
})