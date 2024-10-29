import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'


const Splash = () => {
  const theme = useTheme();
  return (
    <View style={styles.container(theme.colors.surface)}>
      <ActivityIndicator size={50}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: (color) => {
        return {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color
        }
    }
})