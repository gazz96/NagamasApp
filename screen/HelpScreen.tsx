import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, List } from 'react-native-paper'
import FaqAction from '../actions/FaqAction'
import { useIsFocused } from '@react-navigation/native'

const HelpScreen = () => {

  const isFocused = useIsFocused();
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const getFaq = async() => {
    try {
      setLoading(true);
      const response = await FaqAction.list({
        posts_per_page: 100
      });
      setRows(response?.data ?? []);
    }
    catch(error) {

    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFaq();
  }, [])

  if(isLoading) {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenWrapper>
        <Appbar.Header>
          <Appbar.Content title="Help" titleStyle={{
            fontWeight: 'bold'
          }} />
        </Appbar.Header>
        
        <View style={{paddingHorizontal: 16}}>

          {
            rows.map((row, index) => (
              <View style={styles.listItem} key={row.id}>
                <Text style={styles.title}>{index+1}. {row.question}</Text>
                <Text style={styles.description}>{row.answer}</Text>
              </View>
            ))
          }
        
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
  title: {fontWeight: 'bold', color: '#222', marginBottom: 8, fontSize: 18},
  description: {

  }
})